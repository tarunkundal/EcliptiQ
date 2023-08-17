import {
	Box,
	Button,
	Heading,
	Stack,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { GrStatusCriticalSmall } from 'react-icons/gr';
import { MdOutlineAlternateEmail } from 'react-icons/md';

import useCustomToast from '../../../hooks/useToastHook';
import { useAppDispatch, useAppSelector } from '../../store';
import supabase from '../../supabase';
import { _fetchInvitationsWithTeamName, _updateInvitation } from '../service';
import { invitationActions } from '../slice';
import { InvitationTable, InvitationTableWithTeamName } from '../types';

type InvitationType = InvitationTable | InvitationTableWithTeamName;
// type guard function
function isInvitationWithTeamName(
	invitation: InvitationType
): invitation is InvitationTableWithTeamName {
	return 'teams' in invitation;
}

const Invitations = () => {
	const userInvitations = useAppSelector(
		(state) => state.invitations.invitations
	);
	const [userInvitaionsWithTeamName, setUserInvitaionsWithTeamName] = useState<
		InvitationType[]
	>([]);
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user.user);
	const customToast = useCustomToast();

	// fetching invitations with team name
	useEffect(() => {
		const fetchInvitationsByTeamName = async () => {
			const { data, error } = await _fetchInvitationsWithTeamName({
				userEmail: user?.email,
			});
			if (data && !error) {
				setUserInvitaionsWithTeamName(data);
			} else if (error && !data) {
				setUserInvitaionsWithTeamName(userInvitations);
				console.log(error);
			}
		};
		fetchInvitationsByTeamName();
	}, []);
	// accept invitataion handler
	const acceptInvitationHandler = async (props: {
		invitationId: string;
		teamId: string;
	}) => {
		const invitationId = props.invitationId;
		// updating invitation table
		const { error } = await _updateInvitation({
			status: 'accepted',
			invitationId: invitationId,
		});
		dispatch(
			invitationActions.update_invitation({
				invitationId: invitationId,
				status: 'accepted',
			})
		);

		// adding this user to the members table
		const res = await supabase
			.from('members')
			.insert([
				{
					team_id: props.teamId,
					user_id: user?.id,
					user_email: user?.email,
				},
			])
			.select();
		if (res.data && !res.error && !error) {
			customToast({
				title: 'Congrulation you are the part of the team',
				status: 'success',
			});
		} else if (error || res.error) {
			customToast({
				title: 'Error while adding you in the team.',
				status: 'error',
				description: error?.message,
			});
		}
	};

	// reject invitation handler
	const rejectInvitationHandler = async (props: {
		invitationId: string;
		teamId: string;
	}) => {
		const invitationId = props.invitationId;
		// updating invitation table
		const { error } = await _updateInvitation({
			status: 'rejected',
			invitationId: invitationId,
		});
		// updating data in store
		dispatch(
			invitationActions.update_invitation({
				invitationId: invitationId,
				status: 'rejected',
			})
		);
		if (error) {
			customToast({ title: error.message, status: 'error' });
		} else if (!error) {
			customToast({ title: 'You rejected the invitation.', status: 'info' });
		}
	};

	return (
		<Stack p={2} my={4} gap={4}>
			<Stack
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
				mx={12}
			>
				<Stack>
					<Heading fontSize="25px">Invitations</Heading>
					<Text fontSize="14px">Manage your invitations</Text>
				</Stack>
				<Text fontWeight="semibold">{user?.username}</Text>
			</Stack>
			<hr />
			<Stack my={4}>
				<TableContainer>
					<Table variant="unstyled">
						<TableCaption>Invitations are listed above</TableCaption>
						<Thead>
							<Tr>
								<Th>Invited By</Th>
								<Th>Invited In Team</Th>
								<Th>Recieve On</Th>
								<Th>Status</Th>
							</Tr>
						</Thead>

						<Tbody>
							{userInvitaionsWithTeamName.map((invitation) => {
								return (
									<Tr key={invitation.id} fontSize="14px">
										<Td
											fontWeight="semibold"
											py={8}
											display="flex"
											alignItems="center"
										>
											<Box mr={2}>
												<MdOutlineAlternateEmail color="blue" />
											</Box>
											{invitation.invited_byUser_email}
										</Td>

										<Td fontWeight="semibold">
											{isInvitationWithTeamName(invitation)
												? invitation.teams.name
												: invitation.team_id}
										</Td>
										<Td>{invitation.created_at}</Td>
										<Td
											fontWeight="semibold"
											display="flex"
											alignItems="center"
										>
											<Box mr={2}>
												<GrStatusCriticalSmall color="violet" />
											</Box>
											{invitation.status}
										</Td>
										<Td isNumeric>
											<Button
												isDisabled={
													invitation.status !== 'pending' ? true : false
												}
												_disabled={{ cursor: 'not-allowed' }}
												mx={2}
												size="sm"
												variant="blue"
												onClick={() =>
													acceptInvitationHandler({
														invitationId: invitation.id,
														teamId: invitation.team_id,
													})
												}
											>
												Accept
											</Button>
										</Td>
										<Td>
											<Button
												isDisabled={
													invitation.status !== 'pending' ? true : false
												}
												_disabled={{ cursor: 'not-allowed' }}
												mx={2}
												size="sm"
												variant="red"
												onClick={() =>
													rejectInvitationHandler({
														invitationId: invitation.id,
														teamId: invitation.team_id,
													})
												}
											>
												Reject
											</Button>
										</Td>
									</Tr>
								);
							})}
						</Tbody>
					</Table>
				</TableContainer>
			</Stack>
		</Stack>
	);
};

export default Invitations;
