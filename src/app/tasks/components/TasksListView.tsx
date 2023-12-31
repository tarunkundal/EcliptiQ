import { Box, Checkbox, Flex, Icon, Text } from '@chakra-ui/react';
import { AiFillStar, AiOutlineFullscreen, AiOutlineStar } from 'react-icons/ai';
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
	toggleFavorite,
}: {
	tasks: TaskTable[];
	handleCheckboxChange: (id: any, value: any) => void;
	toggleFavorite: (taskId: string, favourite: boolean) => void;
}) => {
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

						<Flex alignItems="center">
							<Text
								color={
									new Date(task.dueDate) < new Date() && task.stage !== 'done'
										? 'red'
										: 'inherit'
								}
								fontWeight={
									new Date(task.dueDate) < new Date() ? 'bold' : 'inherit'
								}
							>
								{new Date(task.dueDate).toDateString()}
							</Text>
							<Box mx={4} cursor="pointer">
								{task.favourite === true ? (
									<AiFillStar
										color="gold"
										fontSize="18px"
										onClick={() => toggleFavorite(task.id, false)}
									/>
								) : (
									<AiOutlineStar
										fontSize="18px"
										onClick={() => toggleFavorite(task.id, true)}
									/>
								)}
							</Box>
							<Link to={`/tasks/${task.id}`} style={{ color: 'initial' }}>
								<AiOutlineFullscreen fontSize="18px" color="blue" />
							</Link>
						</Flex>
					</Flex>
				</Box>
			))}
		</Box>
	);
};

export default TasksListView;
