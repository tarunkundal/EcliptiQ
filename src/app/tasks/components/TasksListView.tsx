import { Box, Checkbox, Flex, Icon, Text } from '@chakra-ui/react';
import { AiOutlineFullscreen } from 'react-icons/ai';
import { PiUserFocus } from 'react-icons/pi';
import { Link } from 'react-router-dom';

import {
	priorityColors,
	priorityIcons,
	stagesColors,
	stagesIcons,
} from '../taskHelper';
import { TaskTable } from '../types';

const TasksListView = ({
	tasks,
	handleCheckboxChange,
}: {
	tasks: TaskTable[];
	handleCheckboxChange: (id: any, value: any) => void;
}) => {
	const todayDate = new Date();

	return (
		<Box fontSize="14px">
			{tasks.map((task) => (
				<Box key={task.id} borderBottom="1px" py={2}>
					<Flex
						key={task.id}
						px={2}
						py={1}
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
										priorityIcons[task.priority as keyof typeof priorityIcons]
									}
									color={
										priorityColors[task.priority as keyof typeof priorityColors]
									}
									fontSize="18px"
								/>
							</Text>
							<Text ml={4}>
								<Icon
									mt={1}
									as={stagesIcons[task.stage as keyof typeof stagesIcons]}
									color={stagesColors[task.stage as keyof typeof stagesColors]}
									fontSize="18px"
								/>
							</Text>
							<Text ml={4}>{task.title} </Text>
						</Flex>

						<Link to={`/tasks/${task.id}`} style={{ color: 'initial' }}>
							<Flex alignItems="center">
								<Text
									color={
										new Date(task.dueDate) < todayDate && task.stage !== 'done'
											? 'red'
											: 'inherit'
									}
									fontWeight={
										new Date(task.dueDate) < todayDate ? 'bold' : 'inherit'
									}
								>
									{task.dueDate}
								</Text>
								<Box mx={4}>
									<PiUserFocus fontSize="18px" />
								</Box>
								<AiOutlineFullscreen fontSize="18px" color="blue" />
							</Flex>
						</Link>
					</Flex>
				</Box>
			))}
		</Box>
	);
};

export default TasksListView;
