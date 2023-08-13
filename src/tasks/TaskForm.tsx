import {
	Button,
	Flex,
	Heading,
	Input,
	Select,
	Stack,
	Text,
	Textarea,
} from '@chakra-ui/react';

const TaskForm = () => {
	return (
		<Stack
			spacing={{ base: '2', md: '4' }}
			boxShadow="2xl"
			rounded="3xl"
			w={{ base: '90%', md: '70%' }}
			mx="auto"
			p="5"
			mt={15}
		>
			<Heading textAlign="center" fontSize="22px" pb={4}>
				Create Task
			</Heading>
			<hr />

			<form>
				<Stack gap={6}>
					<Input border="none" type="text" placeholder="New Task..." />

					<Textarea border="none" placeholder="Add Description..." />

					<Stack flexDirection="row" justifyContent="space-around">
						<Stack>
							<Text fontWeight="semibold" fontSize="14px">
								Forms
							</Text>
							<Select placeholder="Select Form">
								<option value="backlog">Backlog</option>
								<option value="todo">Todo</option>
								<option value="progress">In Progress</option>
								<option value="done">Done</option>
							</Select>
						</Stack>
						<Stack>
							<Text fontWeight="semibold" fontSize="14px">
								Priority
							</Text>
							<Select placeholder="Select Priority">
								<option value="urgent">Urgent</option>
								<option value="high">High</option>
								<option value="medium">Medium</option>
								<option value="low">Low</option>
							</Select>
						</Stack>
						<Stack>
							<Text fontWeight="semibold" fontSize="14px">
								Assign to...
							</Text>
							<Select placeholder="Select option">
								<option value="option1">Option 1</option>
								<option value="option2">Option 2</option>
								<option value="option3">Option 3</option>
							</Select>
						</Stack>
						<Stack>
							<Text fontWeight="semibold" fontSize="14px">
								Due Date
							</Text>
							<Input type="date" />
						</Stack>
					</Stack>

					<hr />
					<Flex justifyContent="space-around">
						<Button type="submit" w="30%" variant="blue">
							Create task
						</Button>
						<Button variant="red" w="30%">
							Cancle
						</Button>
					</Flex>
				</Stack>
			</form>
		</Stack>
	);
};

export default TaskForm;
