import {
	Avatar,
	Button,
	CloseButton,
	Flex,
	Input,
	Stack,
	Text,
	Textarea,
	WrapItem,
} from '@chakra-ui/react';

const UserSetting = () => {
	return (
		<Stack
			px={6}
			gap={{ base: 2, md: 4 }}
			py={4}
			w={{ base: '90%', md: '70%' }}
			rounded="lg"
			mx="auto"
			border="1px"
			fontSize="15px"
		>
			<Flex alignItems="center" justifyContent="space-between">
				<Text fontWeight="bold">Account</Text>
				<Text fontWeight="bold">UserName</Text>
			</Flex>
			<hr />

			<Stack gap={{ base: 2, md: 4 }} w={{ base: 'full', md: '50%' }}>
				<Stack>
					<Text fontWeight="bold">Photo</Text>
					<Flex alignItems="center" justifyContent="space-around">
						<WrapItem mr={4}>
							<Avatar name="Tarun Chauhan" size="xl"></Avatar>
						</WrapItem>
						<Stack>
							<Flex justifyContent="space-between">
								<Button variant="outline" size="sm">
									{' '}
									Change Photo
								</Button>
								<Button size="sm" variant="red">
									Remove Photo
								</Button>
							</Flex>
							<Text fontSize="14px">
								Pick a photo up to 4MB. Your avatar photo will be public.
							</Text>
						</Stack>
					</Flex>
				</Stack>
				<Stack>
					<Text fontWeight="bold">Name</Text>
					<Input type="email" border="2px" value={'tarun@gmail.com'} />
				</Stack>
				<Stack>
					<Text fontWeight="bold">User Name</Text>
					<Input type="text" border="2px" />
				</Stack>
				<Stack>
					<Text fontWeight="bold">Email</Text>
					<Text>tarunchauhan@gmail.com</Text>
				</Stack>

				<Stack>
					<Text fontWeight="bold">Bio</Text>
					<Textarea
						border="2px"
						placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod"
					/>
				</Stack>
			</Stack>
			<hr />
			<Stack>
				<Text fontWeight="bold">Connected accounts</Text>
				<Text fontSize="14px">
					Log in to EcliptiQ with your Google, Facebook, or Apple account.
				</Text>
				<Text fontSize="14px">
					You can log in to EcliptiQ with your Google account
					<b> tschauhan271@gmail.com.</b>
				</Text>
			</Stack>
			<hr />
			<Stack gap={4}>
				<Text fontWeight="bold">Delete account</Text>
				<Text fontSize="14px">
					This will immediately delete all of your data including tasks,
					projects, comments, and more. This can’t be undone.
				</Text>
				<Flex justifyContent="space-between">
					<Button size="sm" variant="red" w="fit-content">
						Delete Account
					</Button>
					<Button size="sm" variant="blue" w="fit-content">
						Update Account
					</Button>
				</Flex>
			</Stack>
		</Stack>
	);
};

export default UserSetting;
