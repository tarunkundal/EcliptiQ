import {
	Avatar,
	Box,
	CloseButton,
	Flex,
	Icon,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { AiOutlineTeam } from 'react-icons/ai';
import { FiHome, FiLogOut, FiPlus, FiSettings, FiUser } from 'react-icons/fi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link, NavLink } from 'react-router-dom';

import InvitationForm from '../app/invitation/components/InvitationForm';
import { useAppSelector } from '../app/store';
import UserProfile from '../app/user/components/UserProfileCard';
import Routes from '../Routes';
import Logout from '../Routes/auth/Logout';
import Logo from './Logo';

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

const Sidebar: React.FC = () => {
	const isMediumScreen = useBreakpointValue({ base: false, md: true });
	const [isOpen, setIsOpen] = useState(false);

	const user = useAppSelector((state) => state.user.user);

	const [isOpenLogout, setIsOpenLogout] = useState(false);
	const [isOpenProfile, setIsOpenProfile] = useState(false);
	const [isOpenInvitation, setIsOpenInvitation] = useState(false);

	const closeLogout = () => setIsOpenLogout(false);
	const openLogout = () => setIsOpenLogout(true);

	const openProfile = () => setIsOpenProfile(true);
	const closeProfile = () => setIsOpenProfile(false);

	const closeInvitation = () => setIsOpenInvitation(false);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			{isOpenLogout && <Logout onClose={closeLogout} />}
			{isOpenProfile && <UserProfile onClose={closeProfile} />}
			{isOpenInvitation && <InvitationForm onClose={closeInvitation} />}

			{!isMediumScreen && (
				<Flex
					boxShadow="xl"
					px={4}
					justifyContent="space-between"
					alignItems="center"
					mb={4}
				>
					<Box
						w="max-content"
						cursor="pointer"
						onClick={toggleSidebar}
						rounded="md"
						p={2}
						display={{ base: 'block', md: 'none' }}
						_hover={{ bg: 'gray.100' }}
					>
						<RxHamburgerMenu fontSize="22px" color="black" />
					</Box>
					<Box mx={2} mb={2}>
						<Logo size={12} />
					</Box>
					<Text fontSize="12px" fontWeight="bold">
						{user?.username ? user?.username : user?.email}
					</Text>
				</Flex>
			)}
			<Box
				position="fixed"
				top={0}
				left={isOpen || isMediumScreen ? 0 : '-100%'}
				height="100vh"
				p={4}
				w={{ base: '50%', md: '200px' }}
				bg="gray.50"
				transition="left 0.3s"
				boxShadow={{ md: 'md' }}
				zIndex={2}
			>
				<Flex justifyContent="space-between" alignItems="center">
					<Box mx={2} mb={2}>
						<Logo size={12} />
					</Box>
					<CloseButton
						display={{ base: 'block', md: 'none' }}
						onClick={() => setIsOpen(false)}
					/>
				</Flex>
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
					Your Team
				</Flex>

				<Link style={{ color: 'initial' }} to={Routes.CREATE_TEAM}>
					<Flex
						_hover={{ bg: 'gray.100', cursor: 'pointer' }}
						alignItems="center"
						p={2}
						my={5}
						mx={2}
						rounded="md"
					>
						<Icon as={AiOutlineTeam} mr="4" />
						Create Team
					</Flex>
				</Link>

				{/* invitation form */}
				<Flex
					_hover={{ bg: 'gray.100', cursor: 'pointer' }}
					alignItems="center"
					p={2}
					my={5}
					mx={2}
					rounded="md"
					onClick={() => setIsOpenInvitation(true)}
				>
					<Icon as={FiPlus} mr="4" />
					Invite People
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

				<Box my={4} position="absolute" bottom={0}>
					<Link to={Routes.USER_SETTING} style={{ color: 'black' }}>
						<Flex
							w="full"
							h="full"
							alignItems="center"
							justifyContent="space-between"
						>
							<Avatar
								size="sm"
								name={user?.username}
								src={user?.avatar_url}
								cursor="pointer"
							/>
							<Flex direction="column" ml={4} fontSize="14px">
								<Text fontWeight="bold">{user?.username}</Text>
								<Text fontSize="12px" w="100px">
									{user?.email}
								</Text>
							</Flex>
						</Flex>
					</Link>
				</Box>
			</Box>
		</>
	);
};

export default Sidebar;
