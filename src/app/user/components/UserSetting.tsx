import {
	Avatar,
	Button,
	Flex,
	Heading,
	Icon,
	Input,
	Stack,
	Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';

import Logout from '../../../Routes/auth/Logout';
import { useAppSelector } from '../../store';

const UserSetting = () => {
	const user = useAppSelector((state) => state.user.user);
	const [isOpenLogout, setIsOpenLogout] = useState(false);

	const closeLogout = () => setIsOpenLogout(false);

	return (
		<>
			{isOpenLogout && <Logout onClose={closeLogout} />}
			<Stack p={2} w={{ base: '90%', md: '70%' }} m="auto">
				<Flex my={4} alignItems="center" justifyContent="space-between">
					<Stack>
						<Heading fontWeight="400" fontSize="24px">
							Profile
						</Heading>
						<Text fontSize="14px">Manage your EcliptiQ Profile</Text>
					</Stack>
					<Stack>
						<Text fontWeight="bold">
							{user?.username ? user.username : user?.email}
						</Text>
						<Flex
							alignItems="center"
							rounded="md"
							color="red"
							cursor="pointer"
							_hover={{ color: 'red.400', fontWeight: 'bold' }}
							justifyContent="center"
							onClick={() => setIsOpenLogout(true)}
						>
							<Icon as={FiLogOut} mr="1" />
							<Text>Logout</Text>
						</Flex>
					</Stack>
				</Flex>
				<hr />

				<Stack gap={{ base: 2, md: 4 }} my={4} w={{ base: 'full', md: '50%' }}>
					<Stack gap={4}>
						<Text>Profile Avatar</Text>
						<Avatar
							name={user?.username ? user.username : user?.email}
							size="2xl"
							src={user?.avatar_url}
						/>
					</Stack>
					<Stack gap={-2}>
						<Text>Email</Text>
						<Text fontSize="14px" fontWeight="bold">
							tarunchauhan@gmail.com
						</Text>
					</Stack>
					<Stack>
						<Text>Name</Text>
						<Input type="email" placeholder="tarun@gmail.com" />
					</Stack>
					<Stack>
						<Text>User Name</Text>
						<Input type="text" />
					</Stack>
					<Button mb={4} size="sm" variant="blue" w="fit-content">
						Update Account
					</Button>
				</Stack>
				<hr />
				<Stack my={4} gap={4}>
					<Text fontWeight="black">Connected accounts</Text>
					<Text fontSize="14px">
						Log in to EcliptiQ with your Google, or Email Password.
					</Text>
					<Text fontSize="14px">
						You can log in to EcliptiQ with your Google account
						<b> tschauhan271@gmail.com.</b>
					</Text>
				</Stack>
				<hr />
				<Stack gap={4} my={4}>
					<Text fontWeight="bold">Delete account</Text>
					<Text fontSize="14px">
						This will immediately delete all of your data including tasks,
						projects, comments, and more. This can’t be undone.
					</Text>

					<Button size="sm" variant="red" w="fit-content">
						Delete Account
					</Button>
				</Stack>
			</Stack>
		</>
	);
};

export default UserSetting;
