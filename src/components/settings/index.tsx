import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Select,
} from '@chakra-ui/react';
import React from 'react';

import SettingsSidebar from './Sidebar';

const Settings = () => {
	return (
		<>
			<SettingsSidebar />

			<Container maxW="container.md">
				<Box py={8}>
					<Heading size="lg" mb={4}>
						Settings
					</Heading>
					<Box borderWidth="1px" p={4} rounded="md" shadow="md">
						<FormControl mb={4}>
							<FormLabel>Enable Notifications</FormLabel>
							<Checkbox>Enable</Checkbox>
						</FormControl>

						<FormControl mb={4}>
							<FormLabel>Language</FormLabel>
							<Select>
								<option>English</option>
								<option>Spanish</option>
								<option>French</option>
							</Select>
						</FormControl>

						<FormControl mb={4}>
							<FormLabel>Username</FormLabel>
							<Input placeholder="Enter your username" />
						</FormControl>

						<Button colorScheme="blue">Save Changes</Button>
					</Box>
				</Box>
			</Container>
		</>
	);
};

export default Settings;
