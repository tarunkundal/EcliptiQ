import {
	Avatar,
	Button,
	Flex,
	Heading,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Text,
	Tr,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import { LuArrowDownCircle } from 'react-icons/lu';

// import { useParams } from 'react-router-dom';
import InvitationForm from '../../invitation/components/InvitationForm';

const MembersList = () => {
	// const { id } = useParams();
	// const teamId = id;

	const [sendInvite, setSendInvite] = useState(false);

	const closeInvitation = () => setSendInvite(false);
	return (
		<>
			{sendInvite && <InvitationForm onClose={closeInvitation} />}

			<Stack w={{ base: '90%', md: '60%' }} p={2} m="auto">
				<Stack my={4} gap={4}>
					<Heading fontWeight="400" fontSize="30px">
						Team Members
					</Heading>
					<Text>Manage who is the member of `Team Name`</Text>
				</Stack>
				<hr />
				<Text my={4}>Manage Members</Text>
				<Stack flexDirection="row" justifyContent="space-between">
					<Menu>
						<MenuButton
							as={Button}
							_hover={{ boxShadow: 'xl' }}
							color="black"
							colorScheme="whiteAlpha"
							rightIcon={<LuArrowDownCircle color="red" />}
						>
							Fliter
						</MenuButton>
						<MenuList>
							<MenuItem>All</MenuItem>
							<MenuItem icon={<FiUsers />}>Member</MenuItem>
						</MenuList>
					</Menu>
					<Button
						variant="blue"
						onClick={() => setSendInvite(true)}
						fontWeight="thin"
					>
						Add a member
					</Button>
				</Stack>

				<Stack my={4}>
					<TableContainer>
						<Table variant="simple">
							<TableCaption>
								Above is the list of your team members
							</TableCaption>

							<Tbody>
								<Tr>
									<Td>
										<Flex alignItems="center">
											<Avatar size="sm" />
											<Stack gap={-1} ml={2}>
												<Text fontSize="15px" fontWeight="semibold">
													Tarun Chauhan
												</Text>
												<Text fontSize="13px">email@gmail.com</Text>
											</Stack>
										</Flex>
									</Td>
									<Td>Role</Td>
									<Td isNumeric>Leave Team</Td>
								</Tr>
							</Tbody>
						</Table>
					</TableContainer>
				</Stack>
			</Stack>
		</>
	);
};

export default MembersList;
