import {
	Avatar,
	Box,
	Button,
	Flex,
	Heading,
	Stack,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Text,
	Tr,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useCustomToast from '../../../hooks/useToastHook';
import InvitationForm from '../../invitation/components/InvitationForm';
import { useAppDispatch, useAppSelector } from '../../store';
import { _deleteMemberById, _fetchAllTeamsMembers } from '../service';
import { memberActions } from '../slice';

interface RouteParams {
	id: string;
}

const MembersList = () => {
	const { id } = useParams<RouteParams>();
	const dispatch = useAppDispatch();
	const customToast = useCustomToast();
	const teamId = id;
	const [sendInvite, setSendInvite] = useState(false);
	const members = useAppSelector((state) => state.members.members);
	const teams = useAppSelector((state) => state.teams.teams);

	// finding team by teamId
	const selectedTeam = teams.find((team) => team.id === teamId);

	// fetching team members
	useEffect(() => {
		const fetchAllTeamMemberByTeamId = async () => {
			const { data, error } = await _fetchAllTeamsMembers(teamId);
			if (!error && data) {
				dispatch(memberActions.set_member({ members: data }));
			} else if (error) {
				customToast({
					title: 'Error while fetching members.',
					status: 'error',
				});
			}
		};
		fetchAllTeamMemberByTeamId();
	}, [teamId]);

	// delete team member
	const deleteTeamMemberHandler = async (memberId: string) => {
		const { error } = await _deleteMemberById(memberId);
		if (error) {
			customToast({
				title: 'Error while removing from members List',
				status: 'error',
			});
		} else if (!error) {
			customToast({ title: 'Removed sucessfully', status: 'success' });
			dispatch(memberActions.delete_member({ memberId: memberId }));
		}
	};

	const closeInvitation = () => setSendInvite(false);
	return (
		<>
			{sendInvite && <InvitationForm onClose={closeInvitation} />}

			<Stack w={{ base: '90%', md: '60%' }} p={2} m="auto">
				<Stack my={4} gap={4}>
					<Heading fontWeight="400" fontSize="30px">
						Team Members
					</Heading>
					<Text>
						Manage the members of <b> `{selectedTeam?.name}`</b>
					</Text>
				</Stack>
				<hr />
				<Text my={4}>Manage Members</Text>
				<Stack flexDirection="row" justifyContent="space-between">
					<Box />
					<Button
						variant="blue"
						onClick={() => setSendInvite(true)}
						fontWeight="thin"
					>
						Add a member
					</Button>
				</Stack>

				<Stack my={4}>
					<TableContainer>
						<Table variant="simple">
							<TableCaption>
								Above is the list of your team members
							</TableCaption>

							<Tbody>
								{members.map((member) => {
									return (
										<Tr key={member.id}>
											<Td>
												<Flex alignItems="center">
													<Avatar size="sm" name={member.user_email} />
													<Stack gap={-1} ml={2}>
														<Text fontSize="14px" fontWeight="semibold">
															{member.user_email}
														</Text>
													</Stack>
												</Flex>
											</Td>
											<Td>{member.role}</Td>
											<Td isNumeric>
												{member.role === 'member' ? (
													<Button
														onClick={() => deleteTeamMemberHandler(member.id)}
														variant="red"
														size="sm"
													>
														Leave Team
													</Button>
												) : (
													''
												)}
											</Td>
										</Tr>
									);
								})}
							</Tbody>
						</Table>
					</TableContainer>
				</Stack>
			</Stack>
		</>
	);
};

export default MembersList;
