import {
	Box,
	Flex,
	Input,
	InputGroup,
	InputLeftElement,
	Text,
} from '@chakra-ui/react';
import {
	AiFillStar,
	AiOutlineCheckCircle,
	AiOutlineHome,
	AiOutlineSearch,
} from 'react-icons/ai';
import { BsPlusSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import Routes from '../Routes';
import Sidebar from '../sidebar';
import NotificationMenu from './NotificationMenu';
import SettingMenu from './SettingMenu';

const Header = () => {
	return (
		<Box zIndex={2} h="44px" bg="gray.600" w="100vw" position="fixed" px="1rem">
			<Flex
				my="auto"
				alignItems="center"
				justifyContent="space-between"
				w="100%"
			>
				<Flex
					alignItems="center"
					w={{ base: '50%', md: '20%' }}
					justifyContent="space-between"
				>
					<Box
						display={{ base: 'none', md: 'block' }}
						_hover={{ bg: 'gray.500' }}
						p={2}
						rounded="lg"
					>
						<Sidebar />
					</Box>
					<Box _hover={{ bg: 'gray.500' }} p={2} rounded="lg">
						<Link to={Routes.DASHBOARD}>
							<AiOutlineHome fontSize="22px" color="white" cursor="pointer" />
						</Link>
					</Box>

					<InputGroup color="white" size="sm" w="200px">
						<InputLeftElement
							pointerEvents="none"
							children={<AiOutlineSearch color="gray.300" />}
						/>
						<Input
							_placeholder={{ color: 'white' }}
							rounded="2xl"
							type="text"
							placeholder="Search..."
						/>
					</InputGroup>
				</Flex>
				<Flex
					justifyContent="space-around"
					w={{ base: '30%', md: '18%' }}
					alignItems="center"
				>
					<Flex alignItems="center" display={{ base: 'none', md: 'flex' }}>
						<AiFillStar color="gold" />
						<Text ml={1} color="white">
							Free Plan
						</Text>
					</Flex>
					<Box _hover={{ bg: 'gray.500' }} p={1} rounded="lg">
						<Link to={Routes.NEWTASK}>
							<BsPlusSquare fontSize="22px" color="white" cursor="pointer" />
						</Link>
					</Box>
					<Box _hover={{ bg: 'gray.500' }} p={1} rounded="lg">
						<AiOutlineCheckCircle
							fontSize="22px"
							color="white"
							cursor="pointer"
						/>
					</Box>
					<Box _hover={{ bg: 'gray.500' }} p={1} rounded="lg">
						<NotificationMenu />
					</Box>
					<SettingMenu />
				</Flex>
			</Flex>
		</Box>
	);
};

export default Header;
