import { Box, useDisclosure, Flex, Text, Icon } from '@chakra-ui/react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineClose } from 'react-icons/ai';
import { FiHome, FiSettings, FiLogOut, FiPlus, FiUser } from 'react-icons/fi';
import { IconType } from 'react-icons';
import Logo from '../components/Logo';
import Logout from '../Routes/auth/Logout';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Routes from '../Routes';
import UserProfile from '../user/UserProfileCard';

interface LinkItemProps {
	name: string;
	icon: IconType;
	path: string;
}

const LinkItems: Array<LinkItemProps> = [
	{ name: 'Home', icon: FiHome, path: Routes.DASHBOARD },
	{ name: 'New Task', icon: FiPlus, path: Routes.NEWTASK },
	{ name: 'Settings', icon: FiSettings, path: Routes.USER_SETTING },
];

const Sidebar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isOpenLogout, setIsOpenLogout] = useState(false);
	const [isOpenProfile, setIsOpenProfile] = useState(false);

	const closeLogout = () => setIsOpenLogout(false);
	const openLogout = () => setIsOpenLogout(true);

	const openProfile = () => setIsOpenProfile(true);
	const closeProfile = () => setIsOpenProfile(false);
	return (
		<>
			{isOpenLogout && <Logout onClose={closeLogout} />}
			{isOpenProfile && <UserProfile onClose={closeProfile} />}

			<Box>
				<Box
					w="max-content"
					cursor="pointer"
					onClick={isOpen ? onClose : onOpen}
				>
					{isOpen ? (
						<AiOutlineClose fontSize="22px" color="white" />
					) : (
						<RxHamburgerMenu fontSize="22px" color="white" />
					)}
				</Box>

				<Box
					width={isOpen ? '200px' : '0'}
					// w="200px"
					position="fixed"
					top="44px"
					left="0"
					minH="100vh"
					bg="gray.50"
					overflowX="hidden"
					transition="0.3s"
					boxShadow="md"
					color="black"
				>
					<Box mx={2} mb={2}>
						<Logo size={12} />
					</Box>
					<hr />
					{LinkItems.map((item) => {
						return (
							<NavLink
								style={{ color: 'black' }}
								to={item.path}
								activeStyle={{ color: 'violet' }}
							>
								<Flex
									_hover={{ bg: 'gray.100', cursor: 'pointer' }}
									alignItems="center"
									p={2}
									my={5}
									mx={2}
									rounded="md"
								>
									<Icon as={item.icon} mr="4" />
									{item.name}
								</Flex>
							</NavLink>
						);
					})}
					<Flex
						_hover={{ bg: 'gray.100', cursor: 'pointer' }}
						alignItems="center"
						p={2}
						my={5}
						mx={2}
						rounded="md"
						onClick={openProfile}
					>
						<Icon as={FiUser} mr="4" />
						Profile
					</Flex>
					<hr />
					<Flex
						_hover={{ bg: 'gray.100', cursor: 'pointer' }}
						alignItems="center"
						p={2}
						my={5}
						mx={2}
						rounded="md"
						onClick={openLogout}
					>
						<Icon as={FiLogOut} mr="4" />
						<Text>Logout</Text>
					</Flex>
				</Box>
			</Box>
		</>
	);
};

export default Sidebar;
