import {
	Box,
	Button,
	Flex,
	Heading,
	Input,
	Stack,
	Text,
	Textarea,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { LuArrowRight } from 'react-icons/lu';
import { MdClose } from 'react-icons/md';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';

import useCustomToast from '../../../hooks/useToastHook';
import { useAppDispatch, useAppSelector } from '../../store';
import { _updateTask } from '../service';
import { taskActions } from '../slice';
import {
	customControl,
	CustomOption,
	PriorityOptions,
	StatusOptions,
} from '../taskHelper';
// import { NewTaskData } from '../types';

interface RouteParams {
	taskId: string;
}

const TaskUpdateForm = () => {
	const { taskId } = useParams<RouteParams>();
	const history = useHistory();
	const dispatch = useAppDispatch();
	const customToast = useCustomToast();

	const teams = useAppSelector((state) => state.teams.teams);
	const tasks = useAppSelector((state) => state.tasks.tasks);

	const taskToUpdate = tasks.find((task) => task.id === taskId);

	const [taskTitle, setTaskTitle] = useState('');
	const [taskDescription, setTaskDescription] = useState('');
	const [taskPriorty, setTaskPriority] = useState('');
	const [taskStatus, setTaskStatus] = useState('');
	const [dueDate, setDueDate] = useState<any>('');

	useEffect(() => {
		if (taskToUpdate) {
			setTaskTitle(taskToUpdate.title || '');
			setTaskDescription(taskToUpdate.description || '');
			setTaskPriority(taskToUpdate.priority || '');
			setTaskStatus(taskToUpdate.stage || '');
			setDueDate(taskToUpdate.dueDate || '');
		}
	}, [taskToUpdate]);

	const selectedTeam = teams.find((team) => team.id === taskToUpdate?.team_id);

	// handle priority, stage and assigned to
	const handlePriorityChange = (selectedOption: string) => {
		setTaskPriority(selectedOption);
	};
	const handleStatusChange = (selectedOption: string) => {
		setTaskStatus(selectedOption);
	};
	const handleDateChange = (e: { target: { value: any } }) => {
		const dateString = e.target.value;
		const newDate = new Date(dateString);
		setDueDate(newDate);
	};

	// update task handler
	const handleUpdateHandler = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		const taskData = {
			title: taskTitle,
			description: taskDescription,
			priority: taskPriorty,
			stage: taskStatus,
			dueDate: dueDate,
		};

		const { data, error } = await _updateTask({
			taskId: taskId,
			taskData: taskData,
		});
		if (data && !error) {
			customToast({ title: 'Task Updated Sucessfully.', status: 'success' });
			dispatch(taskActions.update_task({ taskId: taskId, taskData: taskData }));
			history.goBack();
		} else if (error) {
			customToast({ title: 'Error while updating task.', status: 'error' });
			history.goBack();

			console.log(error);
		}
	};

	return (
		<Stack
			spacing={{ base: '2', md: '4' }}
			rounded={{ base: 'md', md: '2xl' }}
			mx="auto"
			p={{ base: '2', md: '5' }}
			w={{ base: '90%', md: '70%' }}
			my={4}
			mt={{ base: '0', md: '5%' }}
			border="1px"
			borderColor="gray.200"
			fontSize={{ base: '14px', md: '-moz-initial' }}
		>
			<Heading textAlign="center">Update Task</Heading>
			<Flex justifyContent="space-between">
				<Flex alignItems="center" fontSize="14px">
					<Box p="2px" px={2} border="1px" borderColor="gray.100" rounded="md">
						{selectedTeam?.name}
					</Box>
					<Box mx={1}>
						<LuArrowRight />
					</Box>
					<Text>Update Task</Text>
				</Flex>
				<Button
					onClick={() => history.goBack()}
					mt={-16}
					variant="red"
					size="sm"
				>
					<MdClose color="white" />
				</Button>{' '}
			</Flex>
			<hr />

			<form onSubmit={handleUpdateHandler}>
				<Stack gap={{ base: 3, md: 6 }}>
					<Input
						type="text"
						value={taskTitle}
						onChange={(e) => setTaskTitle(e.target.value)}
						placeholder="Task Title..."
					/>

					<Textarea
						placeholder="Task Description..."
						value={taskDescription}
						onChange={(e) => setTaskDescription(e.target.value)}
					/>

					<Stack
						display={{ base: 'grid', md: 'flex' }}
						flexDirection={{ base: 'column', md: 'row' }}
						justifyContent="space-around"
					>
						<Stack>
							<Text fontWeight="semibold" fontSize="14px">
								Status
							</Text>
							<Select
								placeholder={`${
									taskStatus.slice(0, 1).toUpperCase() + taskStatus.slice(1)
								}`}
								onChange={(option) => {
									if (option) {
										handleStatusChange(option.value);
									}
								}}
								options={StatusOptions}
								components={{
									Option: CustomOption,
								}}
								styles={customControl}
							/>
						</Stack>
						<Stack>
							<Text fontWeight="semibold" fontSize="14px">
								Priority
							</Text>
							<Select
								placeholder={`${
									taskPriorty.slice(0, 1).toUpperCase() + taskPriorty.slice(1)
								}`}
								onChange={(option) => handlePriorityChange(option.value)}
								options={PriorityOptions}
								components={{
									Option: CustomOption,
								}}
								styles={customControl}
							/>
						</Stack>

						<Stack>
							<Text fontWeight="semibold" fontSize="14px">
								Due Date
							</Text>
							<Input
								type="date"
								min={new Date().toISOString().substr(0, 10)}
								defaultValue={dueDate}
								cursor="pointer"
								onChange={handleDateChange}
							/>
						</Stack>
					</Stack>

					<hr />
					<Flex justifyContent="space-around">
						<Button onClick={() => history.goBack()} variant="red" w="30%">
							Cancle
						</Button>
						<Button type="submit" w="30%" variant="blue">
							Update task
						</Button>
					</Flex>
				</Stack>
			</form>
		</Stack>
	);
};

export default TaskUpdateForm;
