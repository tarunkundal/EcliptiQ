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
import { BiPlus, BiLogOut } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import Logout from '../Routes/auth/Logout';

const SettingMenu = () => {
	const [isOpenLogut, setIsOpenLogout] = useState(false);

	const closeLogout: React.MouseEventHandler<
		HTMLDivElement | HTMLButtonElement
	> = () => setIsOpenLogout(false);
	const openLogout = () => setIsOpenLogout(true);
	return (
		<>
			{isOpenLogut && <Logout onClose={closeLogout} />}
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
								<Text>emailthakursingh@gmail.com</Text>
							</Flex>
						</Flex>
					</MenuItem>
					<hr />
					<MenuItem mt={1}>
						<FiSettings />
						<Text ml={2}>Setting</Text>
					</MenuItem>

					<MenuItem mb={1}>
						<BiPlus />
						<Text ml={2}>New Task</Text>
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
