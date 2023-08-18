import { Avatar, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { ImConfused } from 'react-icons/im';
import { MdDateRange } from 'react-icons/md';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../store';

interface RouteParams {
	taskID: string;
}

const TaskDetail = () => {
	const { taskID } = useParams<RouteParams>();
	const allTasks = useAppSelector((state) => state.tasks.tasks);

	const selectedTask = allTasks.find((task) => task.id === taskID);

	return (
		<Stack mx="10%" my={4}>
			<Stack my={4} gap={6}>
				<Heading>{selectedTask?.title}</Heading>
				<Text fontSize="18px">{selectedTask?.description}</Text>
			</Stack>
			<hr />
			<Stack my={4} gap={6}>
				<Flex w="300px" justifyContent="space-between">
					<Text>Status</Text>
					<Flex alignItems="center">
						<ImConfused />
						<Text ml={2}>Todo</Text>
					</Flex>
				</Flex>
				<Flex w="300px" justifyContent="space-between">
					<Text>Priority</Text>
					<Flex alignItems="center">
						<ImConfused />
						<Text ml={2}>High</Text>
					</Flex>
				</Flex>{' '}
				<Flex w="300px" justifyContent="space-between">
					<Text>Assignee</Text>
					<Flex alignItems="center">
						<Avatar boxSize="18px" />
						<Text ml={2}>Todo</Text>
					</Flex>
				</Flex>{' '}
				<Flex w="300px" justifyContent="space-between">
					<Text>Due Date</Text>
					<Flex alignItems="center">
						<MdDateRange size="18px" />
						<Text ml={2}>Todo</Text>
					</Flex>
				</Flex>
			</Stack>
			<hr />
			<Stack gap={4} my={4}>
				<Flex w="300px" justifyContent="space-between">
					<Button variant="red" size="sm">
						Delete
					</Button>
					<Button variant="blue" size="sm">
						Update
					</Button>
				</Flex>
			</Stack>
		</Stack>
	);
};

export default TaskDetail;
