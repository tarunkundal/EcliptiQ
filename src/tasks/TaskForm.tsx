import {
	Button,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	Tooltip,
} from '@chakra-ui/react';
import { MouseEventHandler } from 'react';

const TaskForm = (props: {
	onClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement> | undefined;
}) => {
	return (
		<Stack
			spacing={{ base: '2', md: '4' }}
			border="1px"
			w={{ base: '90%', md: '70%' }}
			mx="auto"
			p="5"
			mt={10}
		>
			<Heading
				textAlign={'center'}
				color="primary"
				fontSize={{ base: '2xl', md: '3xl' }}
				fontWeight={'medium'}
				paddingBottom={2}
			>
				Create Task
			</Heading>

			<form>
				<FormControl id="Task" isRequired>
					<Tooltip label="Enter your task title">
						<Input type="text" fontWeight="bold" placeholder="Task Name" />
					</Tooltip>
				</FormControl>

				<FormControl id="Task_Description">
					<Tooltip m={2} label="Enter your task description">
						<Input
							type="text"
							fontWeight={'medium'}
							placeholder="Descripition"
						/>
					</Tooltip>
				</FormControl>

				<FormControl id="Due_Date">
					<FormLabel>Due Date</FormLabel>
					<Tooltip label="Select due date for your task">
						<Input
							type="date"
							id="date"
							placeholder="Due Date"
							cursor="pointer"
							fontWeight={'medium'}
						/>
					</Tooltip>
				</FormControl>

				<Stack direction={'row'} pt={4}>
					<Button w="50%" onClick={props.onClose} variant="red">
						Cancle
						{/* {isUpdate ? 'Cancle Update' : 'Cancle'} */}
					</Button>
					<Button w="50%" variant="blue" type="submit">
						{/* {isLoading ? (
								<Spinner />
							) : (
								<> {isUpdate ? 'Update' : 'Add Task'}</>
							)} */}
						Add Task
					</Button>
				</Stack>
			</form>
		</Stack>
	);
};

export default TaskForm;
