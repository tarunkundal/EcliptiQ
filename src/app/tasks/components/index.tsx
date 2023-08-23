import { Box, Flex, Select, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsMicrosoftTeams } from 'react-icons/bs';
import { FaListUl, FaPlus } from 'react-icons/fa';
import { IoMdArrowDropright } from 'react-icons/io';
import { LuLayoutDashboard } from 'react-icons/lu';
import { Link, useHistory, useLocation } from 'react-router-dom';

import useCustomToast from '../../../hooks/useToastHook';
import { useAppDispatch, useAppSelector } from '../../store';
import { _updateTaskStatus } from '../service';
import { taskActions } from '../slice';
import TasksBoardView from './TasksBoardView';
import TasksListView from './TasksListView';

const AllTasks = () => {
	const history = useHistory();
	const location = useLocation();
	const storedSelectedTeamId = localStorage.getItem('selectedTeamId');
	const teams = useAppSelector((state) => state.teams.teams);
	const allTasks = useAppSelector((state) => state.tasks.tasks);
	const [selectedTeamId, setSelectedTeamId] = useState(
		storedSelectedTeamId || ''
	);
	const customToast = useCustomToast();
	const dispatch = useAppDispatch();
	const [viewMode, setViewMode] = useState('list');

	useEffect(() => {
		const byDefaultSelectedTeamId = teams.length > 0 ? teams[0].id : '';
		setSelectedTeamId(storedSelectedTeamId || byDefaultSelectedTeamId);
	}, []);

	// Save selected team to local storage whenever it changes
	useEffect(() => {
		localStorage.setItem('selectedTeamId', selectedTeamId);
	}, [selectedTeamId]);

	// Handle changing the selected team ID when selecting from the dropdown
	const handleTeamChange = (value: string) => {
		history.replace(location.pathname); // Keep the current route and update URL
		setSelectedTeamId(value); // Update the selectedTeamId directly
	};

	const selectedTeam = teams.find((team) => team.id === selectedTeamId);

	// fetching selected team tasks
	const allTeamTasks = allTasks.filter(
		(task) => task.team_id === selectedTeamId
	);

	// handle checkbox state
	const handleCheckboxChange = async (taskId: string, checked: boolean) => {
		let taskStatus = 'todo';
		if (checked === true) {
			taskStatus = 'done';
		}

		const { data, error } = await _updateTaskStatus({
			taskId: taskId,
			taskStatus: taskStatus,
		});

		if (data && !error) {
			customToast({
				title: 'Task stage updated sucessfully.',
				status: 'success',
			});
			dispatch(
				taskActions.update_task_status({ taskId: taskId, stage: taskStatus })
			);
		} else if (error) {
			customToast({
				title: 'Error while updating task stage.',
				status: 'error',
			});
		}
	};

	return (
		<Stack my={{ base: 0, md: 4 }} gap={4}>
			<Flex
				p={2}
				fontSize={{ base: '14px', md: '' }}
				alignItems="center"
				justifyContent="space-between"
			>
				<Flex alignItems="center">
					<Box p={1} bg="gray.100" rounded="md">
						<BsMicrosoftTeams />
					</Box>
					<Text mx={2} fontWeight="semibold">
						{selectedTeam?.name}
					</Text>
					<IoMdArrowDropright />
					<Text mx={2}>Your Tasks</Text>
				</Flex>
				<Flex alignItems="center">
					<Link to={`newTask/${selectedTeamId}`} style={{ color: 'initial' }}>
						<Box
							_hover={{ bg: 'black', color: 'white' }}
							cursor="pointer"
							mx={2}
							p={1}
							bg="gray.50"
							rounded="md"
						>
							<FaPlus />
						</Box>
					</Link>
					<Box
						cursor="pointer"
						_hover={{ bg: 'black', color: 'white' }}
						mx={2}
						p={1}
						bg="gray.50"
						rounded="md"
						onClick={() => setViewMode('list')}
					>
						<FaListUl />
					</Box>
					<Box
						_hover={{ bg: 'black', color: 'white' }}
						mx={2}
						p={1}
						cursor="pointer"
						bg="gray.50"
						rounded="md"
						onClick={() => setViewMode('board')}
					>
						<LuLayoutDashboard />
					</Box>
					<Box mx={2} p={1} cursor="pointer" bg="gray.50" rounded="md">
						<Select
							required
							cursor="pointer"
							size="xs"
							value={selectedTeamId}
							onChange={(e) => handleTeamChange(e.target.value)}
						>
							{teams.map((team) => {
								return (
									<option key={team.name} value={team.id}>
										{team.name}
									</option>
								);
							})}
						</Select>
					</Box>
				</Flex>
			</Flex>
			<hr />
			{/* views */}
			{viewMode === 'list' && (
				<TasksListView
					tasks={allTeamTasks}
					handleCheckboxChange={handleCheckboxChange}
				/>
			)}
			{viewMode === 'board' && <TasksBoardView tasks={allTeamTasks} />}
		</Stack>
	);
};

export default AllTasks;
