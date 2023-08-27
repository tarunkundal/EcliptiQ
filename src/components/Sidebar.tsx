import {
	Avatar,
	Box,
	CloseButton,
	Flex,
	Heading,
	Icon,
	Image,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { BsMicrosoftTeams } from 'react-icons/bs';
import { FiPlus } from 'react-icons/fi';
import { GrTasks } from 'react-icons/gr';
import { LuSettings2 } from 'react-icons/lu';
import { RxHamburgerMenu } from 'react-icons/rx';
import { TbSwitch3 } from 'react-icons/tb';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';

import InvitationForm from '../app/invitation/components/InvitationForm';
import { useAppDispatch, useAppSelector } from '../app/store';
import { teamActions } from '../app/team/slice';
import UserProfile from '../app/user_profile/components/UserProfileCard';
import Logo from '../assets/logoQ.png';
import Routes from '../Routes';

interface LinkItemProps {
	name: string;
	icon: IconType;
	path: string;
}

const LinkItems: Array<LinkItemProps> = [
	{ name: 'Tasks', icon: GrTasks, path: Routes.TASKS },
];

const Sidebar: React.FC = () => {
	const isMediumScreen = useBreakpointValue({ base: false, md: true });
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useAppDispatch();

	const user = useAppSelector((state) => state.user.user);
	const userProfileData = useAppSelector(
		(state) => state.userProfile.userProfile
	);
	const [isOpenProfile, setIsOpenProfile] = useState(false);
	const [isOpenInvitation, setIsOpenInvitation] = useState(false);
	const openProfile = () => setIsOpenProfile(true);
	const closeProfile = () => setIsOpenProfile(false);
	const closeInvitation = () => setIsOpenInvitation(false);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	// teams logic for selecting and displaying
	const history = useHistory();
	const location = useLocation();
	const storedSelectedTeamId = localStorage.getItem('selectedTeamId');
	const [selectedTeamId, setSelectedTeamId] = useState(
		storedSelectedTeamId || ''
	);
	const teams = useAppSelector((state) => state.teams.teams);

	useEffect(() => {
		const byDefaultSelectedTeamId = teams.length > 0 ? teams[0].id : '';
		setSelectedTeamId(storedSelectedTeamId || byDefaultSelectedTeamId);
		dispatch(
			teamActions.set_selected_team(
				storedSelectedTeamId || byDefaultSelectedTeamId
			)
		);
	}, []);

	// Save selected team to local storage whenever it changes
	useEffect(() => {
		localStorage.setItem('selectedTeamId', selectedTeamId);
	}, [selectedTeamId]);

	// handle selected team on change
	const handleSelectedTeam = ({ teamId }: { teamId: string }) => {
		history.replace(location.pathname); // Keep the current route and update URL
		setSelectedTeamId(teamId);
		dispatch(teamActions.set_selected_team(teamId)); // Update the selectedTeamId directly
	};

	return (
		<>
			{isOpenProfile && <UserProfile onClose={closeProfile} />}
			{isOpenInvitation && <InvitationForm onClose={closeInvitation} />}

			{!isMediumScreen && (
				<Flex
					boxShadow="outline"
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
						<Image src={Logo} boxSize={12} alt="logo" />
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
				fontSize="14px"
			>
				<Flex justifyContent="space-between" alignItems="center">
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
					>
						<Image src={Logo} boxSize={12} alt="logo" />
						<Heading fontSize="16px" mt={1}>
							EcliptiQ
						</Heading>
					</Box>
					<CloseButton
						display={{ base: 'block', md: 'none' }}
						onClick={() => setIsOpen(false)}
						color="red"
						_hover={{ bg: 'red', color: 'white' }}
					/>
				</Flex>
				<hr />
				<Flex
					_hover={{ bg: 'gray.100', cursor: 'pointer' }}
					alignItems="center"
					p={2}
					my={5}
					mx={{ base: 0, md: 2 }}
					rounded="md"
				>
					<Menu>
						<MenuButton>
							<Flex alignItems="center">
								<TbSwitch3 />
								<Text ml={4}>Switch Teams</Text>
							</Flex>
						</MenuButton>
						<MenuList>
							{teams.map((team) => {
								return (
									<MenuItem
										icon={<BsMicrosoftTeams color="red" />}
										command="⌘N"
										key={team.id}
										onClick={() => handleSelectedTeam({ teamId: team.id })}
									>
										{team.name}
									</MenuItem>
								);
							})}
						</MenuList>
					</Menu>
				</Flex>
				{/* <hr /> */}
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
								mx={{ base: 0, md: 2 }}
								rounded="md"
							>
								<Icon as={item.icon} mr="4" />
								{item.name}
							</Flex>
						</NavLink>
					);
				})}

				{/* invitation form */}
				<Text mt={8} fontSize="12px">
					Try new
				</Text>
				<Flex
					_hover={{ bg: 'gray.100', cursor: 'pointer' }}
					alignItems="center"
					p={2}
					my={2}
					mx={{ base: 0, md: 2 }}
					rounded="md"
					onClick={() => setIsOpenInvitation(true)}
				>
					<Icon as={FiPlus} mr="4" />
					Invite People
				</Flex>
				<Box my={4} position="absolute" bottom={0}>
					<Flex
						_hover={{ bg: 'gray.100', cursor: 'pointer' }}
						alignItems="center"
						p={2}
						my={5}
						mx={{ base: 0, md: 2 }}
						rounded="md"
					>
						<Link style={{ color: 'initial' }} to={Routes.SETTINGS}>
							<Flex alignItems="center">
								<LuSettings2 />
								<Text ml={4}>Settings</Text>
							</Flex>
						</Link>
					</Flex>
					<Flex
						w="full"
						h="full"
						alignItems="center"
						justifyContent="space-between"
						onClick={openProfile}
						cursor="pointer"
					>
						<Avatar
							size="sm"
							name={user?.username}
							src={`https://kiiokeyfnlqufvpdyhap.supabase.co/storage/v1/object/public/avatars/${userProfileData?.avtar_url}`}
							cursor="pointer"
						/>
						<Flex direction="column" ml={4} fontSize="12px">
							<Text w="100px" fontWeight="semibold">
								{userProfileData?.userName
									? userProfileData.userName
									: userProfileData?.user_email}
							</Text>
						</Flex>
					</Flex>
				</Box>
			</Box>
		</>
	);
};

export default Sidebar;
