import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import { MdManageAccounts, MdWorkspacesFilled } from 'react-icons/md';
import { PiPlus } from 'react-icons/pi';
import { Link, useHistory } from 'react-router-dom';

import { useAppSelector } from '../../app/store';
import UserProfile from '../../app/user_profile/components/UserProfileCard';
import Routes from '../../Routes';

const SettingsSidebar = () => {
	const history = useHistory();
	const selectedTeamId = useAppSelector((state) => state.teams.selectedTeamId);
	const [isOpenProfile, setIsOpenProfile] = useState(false);
	const openProfile = () => setIsOpenProfile(true);
	const closeProfile = () => setIsOpenProfile(false);

	return (
		<>
			{isOpenProfile && <UserProfile onClose={closeProfile} />}

			<Box
				position="fixed"
				top={0}
				height="100vh"
				p={4}
				w={{ base: '50%', md: '200px' }}
				bg="gray.50"
				transition="left 0.3s"
				boxShadow={{ md: 'md' }}
				zIndex={2}
				fontSize="14px"
			>
				<Flex alignItems="center">
					<Box cursor="pointer" onClick={() => history.goBack()}>
						<AiOutlineLeft fontSize="18px" />
					</Box>
					<Heading fontSize="20px" ml={6}>
						Settings
					</Heading>
				</Flex>

				<Box mt={8}>
					<Flex alignItems="center" mx={4} mb={4}>
						<Box cursor="pointer" onClick={() => history.goBack()}>
							<MdWorkspacesFilled fontSize="18px" />
						</Box>
						<Text ml={4}>Workspace</Text>
					</Flex>
					<Link to={`/teams/${selectedTeamId}`} style={{ color: 'inherit' }}>
						<Flex
							_hover={{ bg: 'gray.100', cursor: 'pointer' }}
							alignItems="center"
							p={2}
							my={1}
							mx={2}
							rounded="md"
							ml={10}
						>
							General
						</Flex>
					</Link>
					<Link
						to={`/teams/members/${selectedTeamId}`}
						style={{ color: 'inherit' }}
					>
						<Flex
							_hover={{ bg: 'gray.100', cursor: 'pointer' }}
							alignItems="center"
							p={2}
							my={1}
							mx={2}
							rounded="md"
							ml={10}
						>
							Members
						</Flex>
					</Link>
					<Link to={Routes.INVITATIONS} style={{ color: 'inherit' }}>
						<Flex
							_hover={{ bg: 'gray.100', cursor: 'pointer' }}
							alignItems="center"
							p={2}
							my={1}
							mx={2}
							rounded="md"
							ml={10}
						>
							Invitations
						</Flex>
					</Link>
				</Box>
				<Box mt={8}>
					<Flex alignItems="center" mx={4} mb={4}>
						<Box cursor="pointer" onClick={() => history.goBack()}>
							<MdManageAccounts fontSize="18px" />
						</Box>
						<Text ml={4}>My Account</Text>
					</Flex>
					<Link to={Routes.USER_SETTING} style={{ color: 'inherit' }}>
						<Flex
							_hover={{ bg: 'gray.100', cursor: 'pointer' }}
							alignItems="center"
							p={2}
							my={1}
							mx={2}
							rounded="md"
							ml={10}
						>
							General
						</Flex>
					</Link>
					<Flex
						_hover={{ bg: 'gray.100', cursor: 'pointer' }}
						alignItems="center"
						p={2}
						my={1}
						mx={2}
						rounded="md"
						ml={10}
						onClick={openProfile}
					>
						Profile
					</Flex>
				</Box>
				<Text mt={8}>Try now</Text>
				<Link to={Routes.CREATE_TEAM} style={{ color: 'inherit' }}>
					<Flex
						_hover={{ bg: 'gray.100', cursor: 'pointer' }}
						alignItems="center"
						p={2}
						my={1}
						mx={2}
						rounded="md"
					>
						<PiPlus />
						<Text ml={4}>Add Team</Text>
					</Flex>
				</Link>
			</Box>
		</>
	);
};

export default SettingsSidebar;
