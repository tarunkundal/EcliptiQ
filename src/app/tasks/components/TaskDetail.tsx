import {
	Avatar,
	Button,
	Flex,
	Heading,
	Icon,
	Stack,
	Text,
} from '@chakra-ui/react';
import React from 'react';
import { MdDateRange } from 'react-icons/md';
import { Link, useHistory, useParams } from 'react-router-dom';

import useCustomToast from '../../../hooks/useToastHook';
import { useAppDispatch, useAppSelector } from '../../store';
import { _deleteTask } from '../service';
import { taskActions } from '../slice';
import {
	priorityColors,
	priorityIcons,
	stagesColors,
	stagesIcons,
} from '../taskHelper';

interface RouteParams {
	taskID: string;
}

const TaskDetail = () => {
	const { taskID } = useParams<RouteParams>();
	const allTasks = useAppSelector((state) => state.tasks.tasks);
	const teams = useAppSelector((state) => state.teams.teams);
	const customToast = useCustomToast();
	const dispatch = useAppDispatch();
	const history = useHistory();

	const selectedTask = allTasks.find((task) => task.id === taskID);

	// finding team of task from teamId
	const taskOfWhichTeam = teams.find(
		(team) => team.id === selectedTask?.team_id
	);
	const createdDate = new Date(selectedTask?.created_at);
	const dueDate = new Date(selectedTask?.dueDate);

	// delete task handler
	const deleteTaskHandler = async () => {
		const { error } = await _deleteTask(taskID);
		if (!error) {
			customToast({ title: 'Sucussfully deleted.', status: 'success' });
			dispatch(taskActions.delete_task({ taskId: taskID }));
			history.goBack();
		} else if (error) {
			history.goBack();
			customToast({ title: 'Error while deleting task.', status: 'error' });
		}
	};

	return (
		<Stack mx="10%" my={4}>
			<Stack my={4} gap={6}>
				<Heading>{selectedTask?.title}</Heading>

				<Text>
					Team: <b> {taskOfWhichTeam?.name} </b>{' '}
				</Text>
				<Text fontSize="18px">
					{' '}
					<b> Description: </b>{' '}
					{selectedTask?.description ? selectedTask.description : 'null...'}
				</Text>
			</Stack>
			<hr />
			<Stack
				my={4}
				gap={3}
				mx="auto"
				boxShadow="md"
				p={4}
				rounded="md"
				w={{ base: '90%', md: '60%' }}
				fontWeight="semibold"
			>
				<Flex justifyContent="space-between">
					<Text>Status</Text>
					<Flex alignItems="center">
						<Icon
							as={stagesIcons[selectedTask?.stage as keyof typeof stagesIcons]}
							color={
								stagesColors[selectedTask?.stage as keyof typeof stagesColors]
							}
							boxSize="18px"
						/>
						<Text ml={2}>{selectedTask?.stage}</Text>
					</Flex>
				</Flex>
				<hr />
				<Flex justifyContent="space-between">
					<Text>Priority</Text>
					<Flex alignItems="center">
						<Icon
							mt={1}
							as={
								priorityIcons[
									selectedTask?.priority as keyof typeof priorityIcons
								]
							}
							color={
								priorityColors[
									selectedTask?.priority as keyof typeof priorityColors
								]
							}
							boxSize="18px"
						/>
						<Text ml={2}>{selectedTask?.priority}</Text>
					</Flex>
				</Flex>{' '}
				<hr />
				<Flex justifyContent="space-between">
					<Text>Assignee</Text>
					<Flex alignItems="center">
						<Avatar boxSize="18px" />
						<Text ml={2}>{}</Text>
					</Flex>
				</Flex>{' '}
				<hr />
				<Flex justifyContent="space-between">
					<Text>Due Date</Text>
					<Flex alignItems="center">
						<MdDateRange color="red" size="18px" />
						<Text ml={2}>{dueDate.toDateString()}</Text>
					</Flex>
				</Flex>
				<hr />
				<Flex justifyContent="space-between">
					<Text>Created At</Text>
					<Flex alignItems="center">
						<MdDateRange size="18px" color="blue" />
						<Text ml={2}>{createdDate.toDateString()}</Text>
					</Flex>
				</Flex>
				<hr />
			</Stack>
			<hr />
			<Stack gap={4} my={4}>
				<Flex w="50%" mx="auto" justifyContent="space-between">
					<Button variant="red" onClick={deleteTaskHandler} size="sm">
						Delete
					</Button>
					<Link to={`/tasks/task/${selectedTask?.id}`}>
						<Button variant="blue" size="sm">
							Update
						</Button>
					</Link>
				</Flex>
			</Stack>
		</Stack>
	);
};

export default TaskDetail;
