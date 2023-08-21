import {
	Avatar,
	Button,
	Flex,
	Heading,
	Icon,
	Stack,
	Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { MdDateRange } from 'react-icons/md';
import { Link, useHistory, useParams } from 'react-router-dom';

import useCustomToast from '../../../hooks/useToastHook';
import { useAppDispatch, useAppSelector } from '../../store';
import { _fetchAllUsersFromUserProfileTable } from '../../user_profile/services';
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
	const [taskCreatedBy, setTaskCreatedBy] = useState<string | undefined>('');
	const [taskAssignedTo, setTaskAssignedTo] = useState<string | undefined>('');
	const [assigneAvatarUrl, setAssigneAvatarUrl] = useState<string | undefined>(
		''
	);
	const [userAvatarUrl, setuserAvatarUrl] = useState<string | undefined>('');

	const selectedTask = allTasks.find((task) => task.id === taskID);

	// finding task created by and assigned to
	useEffect(() => {
		const fetchAllUsers = async () => {
			const { data } = await _fetchAllUsersFromUserProfileTable();

			const createdBy = data?.find(
				(user) => user.user_id === selectedTask?.created_by
			);
			const assignedTo = data?.find(
				(user) => user.user_id === selectedTask?.assigned_to
			);

			setTaskAssignedTo(assignedTo?.user_email);
			setTaskCreatedBy(createdBy?.user_email);
			setAssigneAvatarUrl(assignedTo?.avtar_url);
			setuserAvatarUrl(createdBy?.avtar_url);
		};
		fetchAllUsers();
	}, [selectedTask]);

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
		<Stack mx={{ base: '5%', md: '10%' }} my={{ base: 0, md: 4 }}>
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
			<Heading fontSize="22px" textDecoration="underline">
				Issue Details :
			</Heading>
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
					<Text>Assigned To</Text>
					<Flex alignItems="center">
						<Avatar
							size="xs"
							name={taskAssignedTo}
							src={`https://kiiokeyfnlqufvpdyhap.supabase.co/storage/v1/object/public/avatars/${assigneAvatarUrl}`}
							fontSize="12px"
						/>
						<Text ml={2}>{taskAssignedTo}</Text>
					</Flex>
				</Flex>{' '}
				<hr />
				<Flex justifyContent="space-between">
					<Text>Created By</Text>
					<Flex alignItems="center">
						<Avatar
							size="xs"
							src={`https://kiiokeyfnlqufvpdyhap.supabase.co/storage/v1/object/public/avatars/${userAvatarUrl}`}
							name={taskCreatedBy}
						/>
						<Text ml={2}>{taskCreatedBy}</Text>
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
					<Button
						variant="red"
						onClick={deleteTaskHandler}
						size={{ base: 'sm', md: 'md' }}
					>
						Delete
					</Button>
					<Link to={`/tasks/task/${selectedTask?.id}`}>
						<Button variant="blue" size={{ base: 'sm', md: 'md' }}>
							Update
						</Button>
					</Link>
				</Flex>
			</Stack>
		</Stack>
	);
};

export default TaskDetail;
