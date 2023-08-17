import { Button, Input, Select, Stack, Text } from '@chakra-ui/react';
import React, { MouseEventHandler, useState } from 'react';

import Modal from '../../../components/Modal';
import useCustomToast from '../../../hooks/useToastHook';
import { useAppDispatch, useAppSelector } from '../../store';
import supabase from '../../supabase';
import { invitationActions } from '../slice';

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

	const user_id = user?.id;

	const userTeamsName = teams.teams.map((team) => team.name);

	// handle invitation handler
	const handleInvitationHandler = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		// finding the teamID in which user invited
		const teamInWhichInvited = teams.teams.filter(
			(team) => team.name === invitedInWhichTeam
		);
		const team_Id = teamInWhichInvited[0].id;

		// fetching all invitations from invitations table
		const response = await supabase.from('invitations').select('*');
		if (response.error) {
			customToast({ title: response.error.message, status: 'error' });
		}
		// finding weather the invitation is alredy send or not
		const isUserAlreadyInvited = response.data?.find(
			(invitation) =>
				invitation.team_id === team_Id &&
				invitation.invited_email === emailToInvited
		);
		if (isUserAlreadyInvited) {
			customToast({
				title: 'User is alredy invited for this team.',
				status: 'warning',
			});
			return;
		}

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
			dispatch(invitationActions.add_invitation({ invitation: data[0] }));
			props.onClose;
		} else if (data === null && error) {
			customToast({
				title: 'Error while sending invitation.',
				description: error.message,
				status: 'error',
			});
		}
	};

	return (
		<Modal onClose={props.onClose}>
			<Stack p={4}>
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
								required
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
