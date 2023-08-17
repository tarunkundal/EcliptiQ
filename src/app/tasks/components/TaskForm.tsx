import {
	Box,
	Button,
	Flex,
	Input,
	Stack,
	Text,
	Textarea,
} from '@chakra-ui/react';
import { LuArrowRight } from 'react-icons/lu';
import { MdClose } from 'react-icons/md';
import Select from 'react-select';

import {
	customControl,
	CustomOption,
	PriorityOptions,
	StatusOptions,
} from '../taskHelper';

const TaskForm = () => {
	// const [selectedPriorty, setSelectedPriority] = useState(null);

	// handle priority
	const handlePriorityChange = (selectedOption: any) => {
		console.log(selectedOption);
	};

	return (
		<Stack
			spacing={{ base: '4', md: '4' }}
			rounded={{ base: 'md', md: '2xl' }}
			mx="auto"
			p={{ base: '2', md: '5' }}
			w={{ base: '90%', md: '70%' }}
			my={4}
			mt={{ base: '0', md: '10%' }}
			border="1px"
			fontSize={{ base: '14px', md: '-moz-initial' }}
		>
			<Flex justifyContent="space-between">
				<Flex alignItems="center" fontSize="14px">
					<Box p="2px" border="1px" borderColor="gray.100" rounded="md">
						Team Name
					</Box>
					<Box mx={1}>
						<LuArrowRight />
					</Box>
					<Text>New Task</Text>
				</Flex>
				<Button variant="red" size="sm">
					<MdClose color="white" />
				</Button>
			</Flex>
			<hr />

			<form>
				<Stack gap={{ base: 3, md: 6 }}>
					<Input type="text" placeholder="Task Title..." />

					<Textarea placeholder="Task Description..." />

					<Stack
						display={{ base: 'grid', md: 'flex' }}
						flexDirection={{ base: 'column', md: 'row' }}
					>
						<Stack>
							<Text fontWeight="semibold" fontSize="14px">
								Status
							</Text>
							<Select
								placeholder="Select Status"
								onChange={handlePriorityChange}
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
								placeholder="Select Priority"
								onChange={handlePriorityChange}
								options={PriorityOptions}
								components={{
									Option: CustomOption,
								}}
								styles={customControl}
							/>
						</Stack>
						<Stack>
							<Text fontWeight="semibold" fontSize="14px">
								Assign to...
							</Text>
							<Select placeholder="Select option" />
						</Stack>
						<Stack>
							<Text fontWeight="semibold" fontSize="14px">
								Due Date
							</Text>
							<Input type="date" cursor="pointer" />
						</Stack>
					</Stack>

					<hr />
					<Flex justifyContent="space-around">
						<Button variant="red" w="30%">
							Cancle
						</Button>
						<Button type="submit" w="30%" variant="blue">
							Create task
						</Button>
					</Flex>
				</Stack>
			</form>
		</Stack>
	);
};

export default TaskForm;
