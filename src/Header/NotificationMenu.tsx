import {
	Flex,
	Heading,
	Image,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
	Text,
} from '@chakra-ui/react';
import React from 'react';
import Logo from '../assets/logoQ.png';
import { AiOutlineBell } from 'react-icons/ai';

const NotificationMenu = () => {
	return (
		<Menu>
			<MenuButton>
				<AiOutlineBell fontSize="22px" color="white" cursor="pointer" />
			</MenuButton>
			<MenuList mt={2}>
				<MenuItem maxW="400px" _hover={{ bg: 'transparent' }} bg="none">
					<Flex alignItems="center">
						<Image w={20} mr={2} src={Logo} alt="logo" />
						<Stack>
							<Heading fontSize="22px">EcliptiQ</Heading>
							<Text>
								You keep progressing- great work!
								<br />
								Your journey towards higher productivity begins today! You are
								now EcliptiQ warrior.
							</Text>
						</Stack>
					</Flex>
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default NotificationMenu;
