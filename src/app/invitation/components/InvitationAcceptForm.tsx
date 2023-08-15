import {
	Avatar,
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Stack,
	Text,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import useCustomToast from '../../../hooks/useToastHook';
import Routes from '../../../Routes';
import { useAppDispatch, useAppSelector } from '../../store';
import supabase from '../../supabase';
import { _updateInvitation } from '../service';
import { invitationActions } from '../slice';

const InvitationAcceptForm = () => {
	const user = useAppSelector((state) => state.user.user);
	const invitations = useAppSelector((state) => state.invitations.invitations);
	const customToast = useCustomToast();
	const dispatch = useAppDispatch();
	const history = useHistory();

	// filtering pending invitations
	const pendingInvitations = invitations.filter(
		(invitation) => invitation.status === 'pending'
	);

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

			history.push(Routes.DASHBOARD);
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
		// update the invitation table
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
		history.push(Routes.DASHBOARD);
		if (error) {
			customToast({ title: error.message, status: 'error' });
		}
	};

	return (
		<>
			<Heading mb={16} textAlign="center">
				{pendingInvitations.length !== 0
					? 'Yours Inivitations'
					: 'No Invitations'}
			</Heading>

			{pendingInvitations.map((invitation) => {
				return (
					<Box
						p={4}
						w="350px"
						m="auto"
						boxShadow="2xl"
						rounded="2xl"
						key={invitation.id}
					>
						<Center w="full">
							<Stack justifyContent="center" gap={4} alignItems="center">
								<Avatar
									mt="-14"
									src={user?.avatar_url}
									name={user?.username}
									size="2xl"
									boxShadow="2xl"
								/>
								<Text
									textAlign="center"
									mb={4}
									borderBottom="2px"
									fontSize="xl"
									fontWeight="semibold"
								>
									{user?.username ? user.username : user?.email}
								</Text>
								<Text textAlign="center">
									You are invited by {invitation.invited_byUser_email}{' '}
								</Text>
								<Flex
									w="300px"
									justifyContent="space-around"
									alignItems="center"
								>
									<Button
										onClick={() =>
											rejectInvitationHandler({
												invitationId: invitation.id,
												teamId: invitation.team_id,
											})
										}
										variant="red"
									>
										Reject
									</Button>
									<Button
										onClick={() =>
											acceptInvitationHandler({
												invitationId: invitation.id,
												teamId: invitation.team_id,
											})
										}
										variant="blue"
									>
										Accept Invite
									</Button>
								</Flex>
							</Stack>
						</Center>
					</Box>
				);
			})}
		</>
	);
};

export default InvitationAcceptForm;
