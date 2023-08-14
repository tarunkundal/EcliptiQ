import {
	Avatar,
	Badge,
	Box,
	Button,
	Center,
	Heading,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { MouseEventHandler } from 'react';
import { useHistory } from 'react-router-dom';

import Modal from '../../../components/Modal';
import Routes from '../../../Routes';

const UserProfile = (props: {
	// eslint-disable-next-line no-undef
	onClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement> | undefined;
}) => {
	const history = useHistory();

	// handle on click
	const handleCloseModalAndRedirect = (e: any) => {
		if (props.onClose) {
			history.push(Routes.USER_SETTING);
			props.onClose(e);
		}
	};

	return (
		<Modal onClose={props.onClose}>
			<Center py={6}>
				<Box
					maxW="350px"
					w="full"
					bg={useColorModeValue('white', 'gray.900')}
					rounded="lg"
					textAlign="center"
				>
					<Avatar
						size="xl"
						src="https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
						mb={4}
						pos="relative"
						_after={{
							content: '""',
							w: 4,
							h: 4,
							bg: 'green.300',
							border: '2px solid white',
							rounded: 'full',
							pos: 'absolute',
							bottom: 0,
							right: 3,
						}}
					/>
					<Heading fontSize="2xl" fontFamily="body">
						Lindsey James
					</Heading>
					<Text fontWeight={600} color="gray.500" mb={4}>
						@lindsey_jam3s
					</Text>
					<Text
						textAlign="center"
						color={useColorModeValue('gray.700', 'gray.400')}
						px={3}
					>
						Actress, musician, songwriter and artist. PM for work inquires or{' '}
						<Text color="blue.400">#tag</Text> me in your posts
					</Text>

					<Stack align="center" justify="center" direction="row" mt={6}>
						<Badge
							px={2}
							py={1}
							bg={useColorModeValue('gray.50', 'gray.800')}
							fontWeight="400"
						>
							#art
						</Badge>
						<Badge
							px={2}
							py={1}
							bg={useColorModeValue('gray.50', 'gray.800')}
							fontWeight="400"
						>
							#photography
						</Badge>
						<Badge
							px={2}
							py={1}
							bg={useColorModeValue('gray.50', 'gray.800')}
							fontWeight="400"
						>
							#music
						</Badge>
					</Stack>

					<Stack
						mt={8}
						direction="row"
						justifyContent="space-around"
						spacing={4}
					>
						<Button
							onClick={props.onClose}
							w="50%"
							rounded="full"
							variant="red"
						>
							Close
						</Button>
						<Button
							onClick={handleCloseModalAndRedirect}
							w="50%"
							rounded="full"
							colorScheme="orange"
							variant="blue"
						>
							Update
						</Button>
					</Stack>
				</Box>
			</Center>
		</Modal>
	);
};

export default UserProfile;
