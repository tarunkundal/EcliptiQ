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
import { FiUser } from 'react-icons/fi';
import { LuArrowRight } from 'react-icons/lu';
import { MdClose } from 'react-icons/md';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';

import useCustomToast from '../../../hooks/useToastHook';
import { _fetchAllTeamsMembers } from '../../members/service';
import { memberActions } from '../../members/slice';
import { useAppDispatch, useAppSelector } from '../../store';
import { _createNewTask } from '../service';
import { taskActions } from '../slice';
import {
	customControl,
	CustomOption,
	PriorityOptions,
	StatusOptions,
} from '../taskHelper';
import { NewTaskData } from '../types';

interface RouteParams {
	teamID: string;
}

const TaskForm = () => {
	const { teamID } = useParams<RouteParams>();
	const history = useHistory();
	const dispatch = useAppDispatch();
	const customToast = useCustomToast();

	const teams = useAppSelector((state) => state.teams.teams);
	const members = useAppSelector((state) => state.members.members);
	const user = useAppSelector((state) => state.user.user);
	const [taskTitle, setTaskTitle] = useState('');
	const [taskDescription, setTaskDescription] = useState('');
	const [taskPriorty, setTaskPriority] = useState('');
	const [taskStatus, setTaskStatus] = useState('');
	const [assignedTo, setAssignedTo] = useState('');
	const [dueDate, setDueDate] = useState<Date>(new Date());

	const selectedTeam = teams.find((team) => team.id === teamID);
	const teamMembers = members.filter((member) => member.team_id === teamID);

	// fetching team members
	useEffect(() => {
		const fetchingAllTeamMembers = async () => {
			const { data } = await _fetchAllTeamsMembers(teamID);
			if (data) {
				dispatch(memberActions.set_member({ members: data }));
			}
		};
		fetchingAllTeamMembers();
	}, [teamID]);

	// handle priority, stage and assigned to
	const handlePriorityChange = (selectedOption: string) => {
		setTaskPriority(selectedOption);
	};
	const handleStatusChange = (selectedOption: string) => {
		setTaskStatus(selectedOption);
	};
	const handleAssignedTo = (selectedOption: string) => {
		setAssignedTo(selectedOption);
	};
	const handleDateChange = (e: { target: { value: any } }) => {
		const dateString = e.target.value;
		const newDate = new Date(dateString);
		setDueDate(newDate);
	};

	// create task handler
	const handleSubmitHandler = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		const taskData: NewTaskData = {
			title: taskTitle,
			description: taskDescription,
			priority: taskPriorty,
			stage: taskStatus,
			dueDate: dueDate,
			team_id: teamID,
			assigned_to: assignedTo,
			created_by: user?.id ? user?.id : '',
			favoutite: false,
		};

		const { data, error } = await _createNewTask({ taskData });

		if (data && !error) {
			customToast({
				title: 'Task created sucessfully.',
				status: 'success',
			});
			dispatch(taskActions.add_task({ task: data[0] }));
			history.goBack();
		} else if (error) {
			customToast({ title: 'Error while creating task.', status: 'error' });
			history.goBack();
		}
	};

	const AssigneOptions = [
		// eslint-disable-next-line no-unsafe-optional-chaining
		...teamMembers?.map((member) => ({
			value: `${member.user_id}`,
			label: `${member.user_email}` || 'No Members',
			icon: <FiUser />,
		})),
	];

	return (
		<Stack
			spacing={{ base: '2', md: '4' }}
			rounded={{ base: 'md', md: '2xl' }}
			mx="auto"
			p={{ base: '4', md: '5' }}
			w={{ base: '95%', md: '70%' }}
			my={4}
			mt={{ base: '0', md: '5%' }}
			borderColor="gray.200"
			fontSize={{ base: '14px', md: '16px' }}
			boxShadow="xs"
		>
			<Heading mb={2} fontSize="22px" textAlign="center">
				New Task
			</Heading>
			<Flex my={4} justifyContent="space-between">
				<Flex alignItems="center" fontSize="14px">
					<Box
						p="2px"
						px={2}
						fontWeight="semibold"
						borderColor="gray.100"
						rounded="md"
						border="2px"
					>
						{selectedTeam?.name}
					</Box>
					<Box mx={1}>
						<LuArrowRight />
					</Box>
					<Text>New Task</Text>
				</Flex>
				<Button
					onClick={() => history.goBack()}
					mt={{ base: -14, md: -16 }}
					variant="red"
					size={{ base: 'xs', md: 'sm' }}
				>
					<MdClose color="white" fontSize="18px" />
				</Button>{' '}
			</Flex>
			<hr />

			<form onSubmit={handleSubmitHandler}>
				<Stack my={4} gap={{ base: 3, md: 6 }} fontSize="14px">
					<Input
						required
						type="text"
						value={taskTitle}
						onChange={(e) => setTaskTitle(e.target.value)}
						placeholder="Task Title..."
						name="task title"
						_placeholder={{ fontSize: '14px' }}
					/>

					<Textarea
						placeholder="Task Description..."
						value={taskDescription}
						onChange={(e) => setTaskDescription(e.target.value)}
						name="description"
						_placeholder={{ fontSize: '14px' }}
					/>

					<Stack
						display={{ base: 'grid', md: 'flex' }}
						flexDirection={{ base: 'column', md: 'row' }}
						my={4}
					>
						<Stack>
							<Text fontWeight="semibold" fontSize="14px">
								Status
							</Text>
							<Select
								placeholder="Task Stage"
								onChange={(option) => handleStatusChange(option.value)}
								options={StatusOptions}
								components={{
									Option: CustomOption,
								}}
								styles={customControl}
								required
							/>
						</Stack>
						<Stack>
							<Text fontWeight="semibold" fontSize="14px">
								Priority
							</Text>
							<Select
								placeholder="Select Priority"
								onChange={(option) => handlePriorityChange(option.value)}
								options={PriorityOptions}
								components={{
									Option: CustomOption,
								}}
								styles={customControl}
								required
							/>
						</Stack>
						<Stack>
							<Text fontWeight="semibold" fontSize="14px">
								Assign to...
							</Text>
							<Select
								placeholder="Select option"
								onChange={(option) => handleAssignedTo(option.value)}
								options={AssigneOptions}
								components={{
									Option: CustomOption,
								}}
								styles={customControl}
								required
							/>
						</Stack>
						<Stack>
							<Text fontWeight="semibold" fontSize="14px">
								Due Date
							</Text>
							<Input
								type="date"
								min={new Date().toISOString().substr(0, 10)}
								value={dueDate ? dueDate.toISOString().substr(0, 10) : ''}
								cursor="pointer"
								onChange={handleDateChange}
								name="date"
							/>
						</Stack>
					</Stack>

					<hr />
					<Flex justifyContent="space-around">
						<Button
							size={{ base: 'sm', md: 'md' }}
							onClick={() => history.goBack()}
							variant="red"
							w="30%"
						>
							Cancle
						</Button>
						<Button
							size={{ base: 'sm', md: 'md' }}
							type="submit"
							w="30%"
							variant="blue"
						>
							Create task
						</Button>
					</Flex>
				</Stack>
			</form>
		</Stack>
	);
};

export default TaskForm;
