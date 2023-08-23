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
import { useAppSelector } from '../../store';

const UserProfile = (props: {
	// eslint-disable-next-line no-undef
	onClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement> | undefined;
}) => {
	const history = useHistory();
	const userProfileData = useAppSelector(
		(state) => state.userProfile.userProfile
	);

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
				<Box rounded="lg" textAlign="center">
					<Avatar
						boxSize={{ base: 150, md: 200 }}
						src={`https://kiiokeyfnlqufvpdyhap.supabase.co/storage/v1/object/public/avatars/${userProfileData?.avtar_url}`}
						mb={4}
						name={userProfileData?.userName || userProfileData?.user_email}
					/>
					<Heading fontSize="2xl" fontFamily="body">
						{userProfileData?.userName}
					</Heading>
					<Text fontWeight={600} color="gray.500" mb={4}>
						{userProfileData?.user_email}
					</Text>
					<Text textAlign="center" px={3} fontWeight="semibold">
						{userProfileData?.bio}
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
