import { Button, Input, Select, Stack, Text } from '@chakra-ui/react';
import React, { MouseEventHandler, useEffect, useState } from 'react';

import Modal from '../../../components/Modal';
import useCustomToast from '../../../hooks/useToastHook';
import { useAppDispatch, useAppSelector } from '../../store';
import supabase from '../../supabase';
import { _fetchAllTeamsOfUser } from '../../team/service';
import { teamActions } from '../../team/slice';

const InvitationForm = (props: {
	// eslint-disable-next-line no-undef
	onClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement> | undefined;
}) => {
	const user = useAppSelector((state) => state.user.user);
	const teams = useAppSelector((state) => state.teams);
	const dispatch = useAppDispatch();
	const [emailToInvited, setEmailToInvited] = useState('');
	const [invitedInWhichTeam, setInvitedInWhichTeam] = useState('');

	const customToast = useCustomToast();

	// fetch all teams for the user
	const user_id = user?.id;
	useEffect(() => {
		const allTeams = async () => {
			const { data } = await _fetchAllTeamsOfUser(user_id);
			if (data) {
				dispatch(teamActions.set_team({ teams: data }));
			}
		};
		allTeams();
	}, []);

	const userTeamsName = teams.teams.map((team) => team.name);

	// handle invitation handler
	const handleInvitationHandler = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		// finding the teamID in which user invited
		const teamInWhichInvited = teams.teams.filter(
			(team) => team.name === invitedInWhichTeam
		);
		const team_Id = teamInWhichInvited[0].id;

		const { data, error } = await supabase
			.from('invitations')
			.insert([
				{
					team_id: team_Id,
					invited_email: emailToInvited,
					invited_by_userId: user_id,
					invited_byUser_email: user?.email,
				},
			])
			.select();

		if (data !== null && !error) {
			customToast({
				title: 'Invitation send successfully.',
				status: 'success',
			});
			props.onClose;
		} else if (data === null && error) {
			customToast({
				title: 'Error while sending invitation.',
				description: error.message,
				status: 'error',
			});
		}

		console.log(data, 'and', error?.message);
	};

	return (
		<Modal onClose={props.onClose}>
			<Stack p={2}>
				<Text mb={2} fontWeight="semibold">
					Invite your team
				</Text>

				<hr />
				<form onSubmit={handleInvitationHandler}>
					<Stack>
						<Stack>
							<Text>Email</Text>
							<Input
								required
								h={14}
								value={emailToInvited}
								onChange={(e) => setEmailToInvited(e.target.value)}
								placeholder="example@gmail.com"
								type="email"
							/>
						</Stack>

						<Stack>
							<Text>Add to team</Text>
							<Select
								placeholder="Select option"
								value={invitedInWhichTeam}
								onChange={(value) => setInvitedInWhichTeam(value.target.value)}
							>
								{userTeamsName.map((name) => {
									return (
										<option key={name} value={name}>
											{name}
										</option>
									);
								})}
							</Select>
						</Stack>
					</Stack>
					<Button type="submit" ml="50%" mt={4} w="50%" variant="blue">
						Send Invite
					</Button>
				</form>
			</Stack>
		</Modal>
	);
};

export default InvitationForm;
