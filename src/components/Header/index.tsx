import {
	Avatar,
	Flex,
	Input,
	InputGroup,
	InputLeftElement,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
	Text,
	WrapItem,
} from '@chakra-ui/react';
import React from 'react';
import {
	AiOutlineBell,
	AiOutlineCheckCircle,
	AiOutlineHome,
	AiOutlineSearch,
} from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsPlusSquare } from 'react-icons/bs';
import { BiLogOut, BiPlus } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import Logout from '../../Routes/auth/Logout';

const Header = () => {
	return (
		<Stack h="44px" px="1rem" bg="purple1" borderBottom="1px">
			<Flex
				my="auto"
				alignItems="center"
				justifyContent="space-between"
				w="100%"
			>
				<Flex
					alignItems="center"
					w={{ base: '58%', md: '20%' }}
					justifyContent="space-between"
				>
					<GiHamburgerMenu fontSize="22px" cursor="pointer" />
					<AiOutlineHome fontSize="22px" cursor="pointer" />
					<InputGroup size="sm" w="200px">
						<InputLeftElement
							pointerEvents="none"
							children={<AiOutlineSearch color="gray.300" />}
						/>
						<Input rounded="2xl" type="text" placeholder="Search..." />
					</InputGroup>
				</Flex>
				<Flex
					justifyContent="space-around"
					w={{ base: '30%', md: '12%' }}
					alignItems="center"
				>
					<BsPlusSquare fontSize="22px" cursor="pointer" />
					<AiOutlineCheckCircle fontSize="22px" cursor="pointer" />
					<AiOutlineBell fontSize="22px" cursor="pointer" />

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
							<MenuItem mt={1} _hover={{ bg: 'red.50', color: 'red' }}>
								<BiLogOut /> <Text ml={2}>LogOut</Text>
							</MenuItem>
							<hr />
							<MenuItem mt={1}>version v4.05^0</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</Flex>
		</Stack>
	);
};

export default Header;
