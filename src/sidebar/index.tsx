import { Box, useDisclosure, Flex, Text, Icon } from '@chakra-ui/react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineClose } from 'react-icons/ai';
import {
	FiHome,
	FiTrendingUp,
	FiCompass,
	FiStar,
	FiSettings,
	FiLogOut,
	FiPlus,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import Logo from '../components/Logo';
import Logout from '../Routes/auth/Logout';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Routes from '../Routes';

interface LinkItemProps {
	name: string;
	icon: IconType;
	path: string;
}

const LinkItems: Array<LinkItemProps> = [
	{ name: 'Home', icon: FiHome, path: Routes.DASHBOARD },
	// { name: 'Trending', icon: FiTrendingUp, path: Routes.DASHBOARD },
	{ name: 'New Task', icon: FiPlus, path: Routes.NEWTASK },
	// { name: 'Explore', icon: FiCompass },
	// { name: 'Favourites', icon: FiStar },
	{ name: 'Settings', icon: FiSettings, path: Routes.SETTINGS_PAGE },
];

const Sidebar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isOpenLogout, setIsOpenLogout] = useState(false);

	const closeLogout = () => setIsOpenLogout(false);
	const openLogout = () => setIsOpenLogout(true);

	return (
		<>
			{isOpenLogout && <Logout onClose={closeLogout} />}

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
					position="fixed"
					top="44px"
					left="0"
					height="100vh"
					bg="gray.50"
					overflowX="hidden"
					transition="0.3s"
					boxShadow="md"
					color="black"
				>
					{/* Sidebar content */}

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
