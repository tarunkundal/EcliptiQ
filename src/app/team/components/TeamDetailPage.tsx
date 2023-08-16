import {
	Box,
	Button,
	Flex,
	Heading,
	Input,
	InputGroup,
	Stack,
	Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsMicrosoftTeams } from 'react-icons/bs';
import { useHistory, useParams } from 'react-router-dom';

import useCustomToast from '../../../hooks/useToastHook';
import { useAppDispatch, useAppSelector } from '../../store';
import { _deleteTeam, _updateTeamName } from '../service';
import { teamActions } from '../slice';

const TeamDetailPage = () => {
	const parm = useParams();
	const teamId = parm.id;
	const teams = useAppSelector((state) => state.teams.teams);
	const selectedTeam = teams.find((team) => team.id === teamId);
	const customToast = useCustomToast();
	const dispatch = useAppDispatch();
	const history = useHistory();
	const [teamName, setTeamName] = useState(selectedTeam?.name);

	// update team handler
	const updateTeamHandler = async () => {
		if (teamName === '') return;

		const { data, error } = await _updateTeamName({
			teamId: teamId,
			teamName: teamName,
		});

		if (data && !error) {
			customToast({ title: 'Updated team sucessfully.', status: 'success' });
			dispatch(teamActions.update_team({ teamId, teamName }));
		} else if (error) {
			customToast({ title: error.message, status: 'error' });
		}
	};

	// delete team handler
	const deleteTeamHandler = async () => {
		const { error } = await _deleteTeam(teamId);
		if (!error) {
			customToast({ title: 'Team deleted sucessfully', status: 'success' });
			dispatch(teamActions.delete_team({ teamId }));
			history.goBack();
		} else if (error) {
			customToast({ title: 'Error while deleting the team.', status: 'error' });
		}
	};

	return (
		<Stack p={2} w={{ base: '90%', md: '70%' }} m="auto">
			<Stack my={4}>
				<Heading>{selectedTeam?.name}</Heading>
				<Text fontSize="14px">Manage team settings</Text>
			</Stack>
			<hr />
			<Stack gap={6} my={4}>
				<Text>General</Text>
				<Stack>
					<Text fontSize="14px">Icon & Team Name</Text>
					<InputGroup alignItems="center">
						<Box p={1} bg="pink1" rounded="md">
							<BsMicrosoftTeams color="red" size="22px" />
						</Box>
						<Input
							defaultValue={selectedTeam?.name}
							onChange={(e) => setTeamName(e.target.value)}
							type="text"
							w="50%"
							ml={2}
						/>
						<Button
							onClick={updateTeamHandler}
							ml={10}
							w="max-content"
							size="sm"
							variant="blue"
						>
							Update
						</Button>
					</InputGroup>
				</Stack>
			</Stack>
			<hr />
			<Stack gap={6} my={4}>
				<Text>Timezone</Text>
				<Text fontSize="14px">
					The timezone should be set as the location where most of your team
					members reside. All other times referenced by the team will be
					relative to this timezone.
				</Text>
				<Box
					p={4}
					border="1px"
					w="80%"
					m="auto"
					borderColor="gray.200"
					rounded="lg"
				>
					<Box>
						<Flex justifyContent="space-around" alignItems="center">
							<Text>Timezone</Text>
							<Box
								p={1}
								border="1px"
								px={4}
								borderColor="gray.100"
								rounded="md"
							>
								<Text>GMT+ 5:30 - Indian Standard Time - Kolkata</Text>
							</Box>
						</Flex>
					</Box>
				</Box>
			</Stack>
			<hr />
			<Stack gap={6} my={4}>
				<Text>Priorities</Text>
				<Text fontSize="14px">
					Priorities help your team communicate and priortize work. EcliptiQ
					orders tasks by priority as a default settings.
				</Text>
			</Stack>
			<hr />
			<Stack gap={6} my={4}>
				<Text>Delete Team</Text>
				<Text fontSize="14px">
					<b>Warning : </b> Deleting the team will also permanently delete any
					issues associated with it. This can’t be undone and your data cannot
					be recovered by EcliptiQ.
				</Text>
				<Button onClick={deleteTeamHandler} w="max-content" variant="red">
					Delete Team
				</Button>
			</Stack>
		</Stack>
	);
};

export default TeamDetailPage;
