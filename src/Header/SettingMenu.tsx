import {
	Menu,
	MenuButton,
	Avatar,
	MenuList,
	MenuItem,
	Flex,
	Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiPlus, BiLogOut, BiUser } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import Logout from '../Routes/auth/Logout';
import { Link } from 'react-router-dom';
import Routes from '../Routes';
import UserProfile from '../user/UserProfileCard';

const SettingMenu = () => {
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
			<Menu>
				<MenuButton>
					<Avatar
						size="sm"
						name="Dan Abrahmov"
						src="https://bit.ly/dan-abramov"
						cursor="pointer"
					/>
				</MenuButton>
				<MenuList p={1}>
					<MenuItem _hover={{ bg: 'violet1' }} mb={1}>
						<Link to={Routes.USER_SETTING} style={{ color: 'black' }}>
							<Flex
								w="full"
								h="full"
								alignItems="center"
								justifyContent="space-between"
							>
								<Avatar
									size="sm"
									name="Dan Abrahmov"
									src="https://bit.ly/dan-abramov"
									cursor="pointer"
								/>
								<Flex direction="column" ml={4} fontSize="14px">
									<Text fontWeight="bold">Tarun Chauhan</Text>
									<Text>singh@gmail.com</Text>
								</Flex>
							</Flex>
							<Flex mt={4} alignItems="center">
								<FiSettings />
								<Text ml={4}>Setting</Text>
							</Flex>
						</Link>
					</MenuItem>
					<hr />

					<Link to={Routes.NEWTASK} style={{ color: 'black' }}>
						<MenuItem mb={1}>
							<BiPlus />
							<Text ml={2}>New Task</Text>
						</MenuItem>
					</Link>
					<MenuItem mb={1} onClick={openProfile}>
						<BiUser />
						<Text ml={2}>Profile</Text>
					</MenuItem>
					<hr />
					<MenuItem
						my={1}
						onClick={openLogout}
						_hover={{ bg: 'red.50', color: 'red' }}
					>
						<BiLogOut /> <Text ml={2}>LogOut</Text>
					</MenuItem>
					<hr />
					<MenuItem mt={1}>version v4.05^0</MenuItem>
				</MenuList>
			</Menu>
		</>
	);
};

export default SettingMenu;
