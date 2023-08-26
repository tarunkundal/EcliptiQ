import { Box, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineFullscreen } from 'react-icons/ai';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { ImSpinner6 } from 'react-icons/im';
import { PiUserFocus } from 'react-icons/pi';
import { TbProgressBolt } from 'react-icons/tb';
import { Link } from 'react-router-dom';

import useFetchBacklogTasks from '../../../hooks/tasksCustomHooks/useFetchBacklogTasks';
import useFetchCompletedTasks from '../../../hooks/tasksCustomHooks/useFetchCompletedTasks';
import useFetchProgressTasks from '../../../hooks/tasksCustomHooks/useFetchProgressTasks';
import useFetchTodoTasks from '../../../hooks/tasksCustomHooks/useFetchTodoTasks';
import { priorityColors, priorityIcons } from '../taskHelper';

const TasksBoardView = () => {
	const { backlogTasks } = useFetchBacklogTasks();
	const { completedTasks } = useFetchCompletedTasks();
	const { progressTasks } = useFetchProgressTasks();
	const { todoTasks } = useFetchTodoTasks();

	return (
		<Box>
			<Flex
				display={{ base: 'block', md: 'flex' }}
				justifyContent="space-between"
				p={4}
				fontSize="14px"
			>
				<Box mx="auto" w={{ base: '80%', md: '24%' }} p={1}>
					<Flex alignItems="center" mb={6} justifyContent="space-between">
						<Text>
							<Flex alignItems="center">
								<FaCheckCircle color="blue" />
								<Text ml={2}>Completed</Text>
							</Flex>
						</Text>
						<Text>{completedTasks.length}</Text>
					</Flex>
					<hr />

					{completedTasks.length === 0 ? (
						<Text textAlign="center" w="full" p={2}>
							.... No Tasks ....
						</Text>
					) : (
						''
					)}
					<ul style={{ listStyle: 'none' }}>
						{completedTasks.map((task) => (
							<li key={task.id}>
								<Link to={`/tasks/${task.id}`} style={{ color: 'initial' }}>
									<Stack
										p={2}
										justifyContent="space-between"
										borderRadius="md"
										flexDirection="row"
										bg="white"
										boxShadow="md"
										border="1px"
										borderColor="blue2"
										my={3}
										_hover={{ bg: 'blue1' }}
									>
										<Stack>
											<Text>{task.title}</Text>
											<Box p={1} rounded="5px" bg="blue1" width="max-content">
												<Icon
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
											</Box>
										</Stack>
										<Stack gap={6}>
											<Box>
												<PiUserFocus fontSize="18px" />
											</Box>
											<AiOutlineFullscreen fontSize="18px" color="blue" />
										</Stack>
									</Stack>
								</Link>
							</li>
						))}
					</ul>
				</Box>
				{/* for progress */}{' '}
				<Box mx="auto" w={{ base: '80%', md: '24%' }} p={1}>
					<Flex alignItems="center" mb={6} justifyContent="space-between">
						<Text>
							<Flex alignItems="center">
								<TbProgressBolt color="red" />
								<Text ml={2}>Progress</Text>
							</Flex>
						</Text>
						<Text>{progressTasks.length}</Text>
					</Flex>
					<hr />
					{progressTasks.length === 0 ? (
						<Text textAlign="center" w="full" p={2}>
							.... No Tasks ....
						</Text>
					) : (
						''
					)}
					<ul style={{ listStyle: 'none' }}>
						{progressTasks.map((task) => (
							<li key={task.id}>
								<Link to={`/tasks/${task.id}`} style={{ color: 'initial' }}>
									<Stack
										p={2}
										justifyContent="space-between"
										borderRadius="md"
										flexDirection="row"
										bg="white"
										boxShadow="md"
										border="1px"
										borderColor="pink_neon"
										my={3}
										_hover={{ bg: 'pink1' }}
									>
										<Stack>
											<Text>{task.title}</Text>
											<Box p={1} rounded="5px" bg="pink1" width="max-content">
												<Icon
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
											</Box>
										</Stack>
										<Stack gap={6}>
											<Box>
												<PiUserFocus fontSize="18px" />
											</Box>
											<AiOutlineFullscreen fontSize="18px" color="blue" />
										</Stack>
									</Stack>
								</Link>
							</li>
						))}
					</ul>
				</Box>
				{/* for todo */}{' '}
				<Box mx="auto" w={{ base: '80%', md: '24%' }} p={1}>
					<Flex alignItems="center" mb={6} justifyContent="space-between">
						<Text>
							<Flex alignItems="center">
								<FaRegCircle color="gray" />
								<Text ml={2}>Todo</Text>
							</Flex>
						</Text>
						<Text>{todoTasks.length}</Text>
					</Flex>
					<hr />
					{todoTasks.length === 0 ? (
						<Text textAlign="center" w="full" p={2}>
							.... No Tasks ....
						</Text>
					) : (
						''
					)}
					<ul style={{ listStyle: 'none' }}>
						{todoTasks.map((task) => (
							<li key={task.id}>
								<Link to={`/tasks/${task.id}`} style={{ color: 'initial' }}>
									<Stack
										p={2}
										justifyContent="space-between"
										borderRadius="md"
										flexDirection="row"
										bg="white"
										boxShadow="md"
										border="1px"
										borderColor="gray.300"
										my={3}
										_hover={{ bg: 'gray.50' }}
									>
										<Stack>
											<Text>{task.title}</Text>
											<Box p={1} rounded="5px" bg="gray.50" width="max-content">
												<Icon
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
											</Box>
										</Stack>
										<Stack gap={6}>
											<Box>
												<PiUserFocus fontSize="18px" />
											</Box>
											<AiOutlineFullscreen fontSize="18px" color="blue" />
										</Stack>
									</Stack>
								</Link>
							</li>
						))}
					</ul>
				</Box>
				{/* for backlog */}{' '}
				<Box mx="auto" w={{ base: '80%', md: '24%' }} p={1}>
					<Flex alignItems="center" mb={6} justifyContent="space-between">
						<Text>
							<Flex alignItems="center">
								<ImSpinner6 color="skyblue" />
								<Text ml={2}>Backlog</Text>
							</Flex>
						</Text>
						<Text>{backlogTasks.length}</Text>
					</Flex>
					<hr />

					{backlogTasks.length === 0 ? (
						<Text textAlign="center" w="full" p={2}>
							.... No Tasks ....
						</Text>
					) : (
						''
					)}
					<ul style={{ listStyle: 'none' }}>
						{backlogTasks.map((task) => (
							<li key={task.id}>
								<Link to={`/tasks/${task.id}`} style={{ color: 'initial' }}>
									<Stack
										p={2}
										justifyContent="space-between"
										borderRadius="md"
										flexDirection="row"
										bg="white"
										boxShadow="md"
										border="1px"
										borderColor="green_neon"
										my={3}
										_hover={{ bg: 'green1' }}
									>
										<Stack>
											<Text>{task.title}</Text>
											<Box p={1} rounded="5px" bg="green1" width="max-content">
												<Icon
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
											</Box>
										</Stack>
										<Stack gap={6}>
											<Box>
												<PiUserFocus fontSize="18px" />
											</Box>
											<AiOutlineFullscreen fontSize="18px" color="blue" />
										</Stack>
									</Stack>
								</Link>
							</li>
						))}
					</ul>
				</Box>
			</Flex>
		</Box>
	);
};

export default TasksBoardView;
