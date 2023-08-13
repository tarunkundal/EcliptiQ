import { Button, Input, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Modal from '../components/Modal';
import useCustomToast from '../hooks/useToastHook';
import supabase from '../lib/api';
import { RootState } from '../store';

const CreateTeamForm = () => {
	const user = useSelector((state: RootState) => state.user.user);
	const [teamName, setTeamName] = useState('');
	const customToast = useCustomToast();

	let creater_id: string;
	if (user) {
		const { id } = user;
		creater_id = id;
	}

	const handleCreateTeamHandler = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (!teamName) {
			customToast({ title: 'Please provide team name.', status: 'warning' });
			return;
		}

		const { error } = await supabase.from('teams').insert([
			{
				creater_id: creater_id,
				team_name: teamName,
			},
		]);

		if (!error) {
			customToast({
				title: 'Team created sucessfully',
				status: 'success',
			});
		}
		if (error) {
			customToast({
				title: (error.code = 23505
					? 'You have already created a team'
					: error.message),
				status: 'error',
			});
		}
	};

	return (
		<Modal onClose={undefined}>
			<Stack p={2}>
				<Text mb={2} fontWeight="semibold">
					Create your team
				</Text>

				<hr />
				<form onSubmit={handleCreateTeamHandler}>
					<Stack>
						<Stack>
							<Text>Team Name</Text>
							<Input
								value={teamName}
								onChange={(e) => setTeamName(e.target.value)}
								placeholder="Your team name..."
								type="text"
							/>
						</Stack>
						<Button type="submit" ml="50%" mt={2} w="50%" variant="blue">
							Create Team
						</Button>
					</Stack>
				</form>
			</Stack>
		</Modal>
	);
};

export default CreateTeamForm;
