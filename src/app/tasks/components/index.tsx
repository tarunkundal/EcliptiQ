import {
	Box,
	Checkbox,
	Flex,
	Icon,
	Select,
	Stack,
	Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsMicrosoftTeams } from 'react-icons/bs';
import { FaPlus, FaThList } from 'react-icons/fa';
import { HiViewList } from 'react-icons/hi';
import { IoMdArrowDropright } from 'react-icons/io';
import { MdOutlineOpenInNew } from 'react-icons/md';
import { PiUserFocus } from 'react-icons/pi';
import { Link, useHistory, useLocation } from 'react-router-dom';

import useCustomToast from '../../../hooks/useToastHook';
import { useAppDispatch, useAppSelector } from '../../store';
import { _updateTaskStatus } from '../service';
import { taskActions } from '../slice';
import {
	priorityColors,
	priorityIcons,
	stagesColors,
	stagesIcons,
} from '../taskHelper';
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
	const teamTasks = allTasks.filter((task) => task.team_id === selectedTeamId);

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
					<Text mx={2}>{selectedTeam?.name}</Text>
					<IoMdArrowDropright />
					<Text mx={2}>Your Tasks</Text>
				</Flex>
				<Flex alignItems="center">
					<Link to={`newTask/${selectedTeamId}`} style={{ color: 'initial' }}>
						<Box cursor="pointer" mx={2} p={1} bg="gray.50" rounded="md">
							<FaPlus />
						</Box>
					</Link>
					<Box cursor="pointer" mx={2} p={1} bg="gray.50" rounded="md">
						<HiViewList />
					</Box>
					<Box mx={2} p={1} cursor="pointer" bg="gray.50" rounded="md">
						<FaThList />
					</Box>
					<Box mx={2} p={1} cursor="pointer" bg="gray.50" rounded="md">
						<Select
							required
							cursor="pointer"
							size="xs"
							value={selectedTeamId}
							onChange={(value) => handleTeamChange(value.target.value)}
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

			<Stack mx={0} fontSize="14px">
				{teamTasks.map((task) => {
					return (
						<Box key={task.id} borderBottom="1px" pb={2}>
							<Flex
								key={task.id}
								p={2}
								justifyContent="space-between"
								alignItems="center"
								_hover={{ bg: 'gray.50' }}
								rounded="md"
							>
								<Flex alignItems="center">
									<Checkbox
										colorScheme="blue"
										onChange={(e) =>
											handleCheckboxChange(task.id, e.target.checked)
										}
										defaultChecked={task.stage === 'done' ? true : false}
									/>
									<Text ml={4}>
										<Icon
											mt={1}
											as={
												priorityIcons[
													task.priority as keyof typeof priorityIcons
												]
											}
											color={
												priorityColors[
													task.priority as keyof typeof priorityColors
												]
											}
											fontSize="18px"
										/>
									</Text>
									<Text ml={4}>
										<Icon
											mt={1}
											as={stagesIcons[task.stage as keyof typeof stagesIcons]}
											color={
												stagesColors[task.stage as keyof typeof stagesColors]
											}
											fontSize="18px"
										/>
									</Text>
									<Text ml={4}>{task.title} </Text>
								</Flex>

								<Link to={`/tasks/${task.id}`} style={{ color: 'initial' }}>
									<Flex alignItems="center">
										<Text fontWeight="light">{task.dueDate}</Text>
										<Box mx={4}>
											<PiUserFocus fontSize="18px" />
										</Box>
										<MdOutlineOpenInNew fontSize="18px" color="blue" />
									</Flex>
								</Link>
							</Flex>
						</Box>
					);
				})}
			</Stack>
		</Stack>
	);
};

export default AllTasks;
