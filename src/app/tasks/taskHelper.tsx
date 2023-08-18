import { Box, Flex, Text } from '@chakra-ui/react';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { ImSpinner6 } from 'react-icons/im';
import { MdLabelImportant } from 'react-icons/md';
import {
	TbAntennaBars3,
	TbAntennaBars4,
	TbAntennaBars5,
	TbProgressBolt,
} from 'react-icons/tb';

export const CustomOption = ({
	innerProps,
	label,
	data,
}: {
	innerProps: any;
	label: any;
	data: any;
}) => (
	<Flex
		{...innerProps}
		alignItems="center"
		_hover={{ bg: 'gray.100', cursor: 'pointer' }}
		p={1}
		px={2}
		my={1}
	>
		<Box p={1} mr={2} rounded="md" bg="gray.100">
			{data.icon && <Text> {data.icon}</Text>}
		</Box>
		{label}
	</Flex>
);

export const PriorityOptions = [
	{ value: 'urgent', label: 'Urgent', icon: <MdLabelImportant color="red" /> },
	{ value: 'high', label: 'High', icon: <TbAntennaBars5 color="green" /> },
	{
		value: 'medium',
		label: 'Medium',
		icon: <TbAntennaBars4 color="blue" />,
	},
	{ value: 'low', label: 'Low', icon: <TbAntennaBars3 color="red" /> },
];

export const StatusOptions = [
	{
		value: 'backlog',
		label: 'Backlog',
		icon: <ImSpinner6 color="skyblue" />,
	},
	{ value: 'todo', label: 'Todo', icon: <FaRegCircle color="gray" /> },
	{
		value: 'progress',
		label: 'Progress',
		icon: <TbProgressBolt color="red" />,
	},
	{ value: 'done', label: 'Done', icon: <FaCheckCircle color="blue" /> },
];

export const customControl = {
	control: (provided: any, state: { isFocused: any }) => ({
		...provided,
		cursor: 'pointer',
		// width: '150px',
		borderColor: state.isFocused ? 'blue' : 'gray',
		boxShadow: state.isFocused ? '0 0 0 1px blue' : 'none',
		'&:hover': {
			borderColor: 'blue',
		},
	}),
};
