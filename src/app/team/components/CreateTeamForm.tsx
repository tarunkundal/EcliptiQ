import {
	Button,
	Center,
	Heading,
	Input,
	Radio,
	RadioGroup,
	Select,
	Stack,
	Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import useCustomToast from '../../../hooks/useToastHook';
import Routes from '../../../Routes';
// import { memberActions } from '../../members/slice';
import { useAppSelector } from '../../store';
import supabase from '../../supabase';

const CreateTeamForm = () => {
	const [teamName, setTeamName] = useState('');
	const [role, setRole] = useState('admin');
	const user = useAppSelector((state) => state.user);
	// const dispatch = useAppDispatch();
	const customToast = useCustomToast();
	const history = useHistory();

	const createWorkspaceHandler = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		// creating new team
		const { data, error } = await supabase
			.from('teams')
			.insert([
				{
					creater_id: user.user?.id,
					name: teamName,
				},
			])
			.select();
		if (data) {
			customToast({
				title: 'Workspace created sucessfully.',
				status: 'success',
			});
			// storing user as admin in the member table
			const res = await supabase
				.from('members')
				.insert([
					{
						team_id: data[0].id,
						user_id: user.user?.id,
						role: 'admin',
						user_email: user.user?.email,
					},
				])
				.select();
			if (res.data) {
				// dispatch(
				// 	memberActions.set_member({
				// 		members: [
				// 			{
				// 				team_id: data[0].id,
				// 				user_id: user.user?.id,
				// 				user_email: user.user?.email,
				// 				id: res.data[0].id,
				// 				role: res.data[0].role,
				// 			},
				// 		],
				// 	})
				// );
				customToast({
					title: 'Sucussfully created you as the admin of your Workspace',
					status: 'success',
				});
			} else if (res.error) {
				console.log('error while inserting as member');
			}

			history.push(Routes.DASHBOARD);
		} else if (error) {
			customToast({
				title: error.message,
				status: 'error',
			});
		}
	};

	return (
		<Center my={6}>
			<Stack w={{ base: '80%', md: '40%' }}>
				<Heading fontSize="2rem" mx="auto">
					Create a new workspace
				</Heading>
				<Text mt={{ base: 2, md: 6 }} textAlign="center">
					Workspace are the shared environments where teams can workon tasks and
					projects.
				</Text>
				<form onSubmit={createWorkspaceHandler}>
					<Stack
						mt={{ base: 6, md: 12 }}
						boxShadow="2xl"
						p={6}
						gap={{ base: 4, md: 8 }}
						rounded="lg"
						fontSize="14px"
					>
						<Stack>
							<Text>Workspace Name</Text>
							<Input
								required
								border="2px"
								borderColor="blue_neon"
								type="text"
								placeholder="Example my workspace"
								_placeholder={{ color: 'gray.300' }}
								value={teamName}
								onChange={(e) => setTeamName(e.target.value)}
							/>
						</Stack>
						<hr />
						<Stack>
							<Text>How large is your company?</Text>
							<Select
								required
								border="2px"
								borderColor="blue_neon"
								placeholder="Select company size"
							>
								<option value="justme">Just me</option>
								<option value="1-5">1-5</option>
								<option value="10+">10+</option>
								<option value="not to say">Prefer not to say</option>
							</Select>
						</Stack>
						<Stack>
							<Text>What is your role?</Text>
							<RadioGroup
								value={role}
								defaultChecked
								onChange={(value) => setRole(value)}
								fontWeight="semibold"
							>
								<Stack direction="row">
									<Radio value="admin">Admin</Radio>
									<Radio value="member">Member</Radio>
								</Stack>
							</RadioGroup>
						</Stack>
						<Button type="submit" w="70%" m="auto" size="lg" variant="blue">
							Create Workspace
						</Button>
					</Stack>
				</form>
			</Stack>
		</Center>
	);
};

export default CreateTeamForm;
