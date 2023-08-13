import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { IconType } from 'react-icons';
import { AiOutlineClose, AiOutlineTeam } from 'react-icons/ai';
import { FiHome, FiLogOut, FiPlus, FiSettings, FiUser } from 'react-icons/fi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { NavLink } from 'react-router-dom';

import Logo from '../components/Logo';
import Routes from '../Routes';
import Logout from '../Routes/auth/Logout';
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
	const [isOpenLogout, setIsOpenLogout] = useState(false);
	const [isOpenProfile, setIsOpenProfile] = useState(false);
	const [isOpenSidebar, setIsOpenSidebar] = useState(true);

	const closeLogout = () => setIsOpenLogout(false);
	const openLogout = () => setIsOpenLogout(true);

	const openProfile = () => setIsOpenProfile(true);
	const closeProfile = () => setIsOpenProfile(false);

	const toggleSidebar = () => setIsOpenSidebar(!isOpenSidebar);

	return (
		<>
			{isOpenLogout && <Logout onClose={closeLogout} />}
			{isOpenProfile && <UserProfile onClose={closeProfile} />}

			<Box>
				<Box w="max-content" cursor="pointer" onClick={toggleSidebar}>
					{isOpenSidebar ? (
						<AiOutlineClose fontSize="22px" color="white" />
					) : (
						<RxHamburgerMenu fontSize="22px" color="white" />
					)}
				</Box>

				<Box
					width={isOpenSidebar ? '200px' : '0'}
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
								key={item.name}
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

					<Flex
						_hover={{ bg: 'gray.100', cursor: 'pointer' }}
						alignItems="center"
						p={2}
						my={5}
						mx={2}
						rounded="md"
						onClick={openProfile}
					>
						<Icon as={AiOutlineTeam} mr="4" />
						Team
					</Flex>

					<Flex
						_hover={{ bg: 'gray.100', cursor: 'pointer' }}
						alignItems="center"
						p={2}
						my={5}
						mx={2}
						rounded="md"
						onClick={undefined}
					>
						<Icon as={AiOutlineTeam} mr="4" />
						Create Team
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
