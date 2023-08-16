import {
	Box,
	Button,
	Heading,
	Stack,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import React from 'react';
import { GrStatusCriticalSmall } from 'react-icons/gr';
import { MdOutlineAlternateEmail } from 'react-icons/md';

import { useAppSelector } from '../../store';

const Invitations = () => {
	const userInvitations = useAppSelector(
		(state) => state.invitations.invitations
	);
	const user = useAppSelector((state) => state.user.user);
	return (
		<Stack p={2} my={4} gap={4}>
			<Stack
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Stack>
					<Heading fontSize="25px">Invitations</Heading>
					<Text fontSize="14px">Manage your invitations</Text>
				</Stack>
				<Text fontWeight="semibold">{user?.username}</Text>
			</Stack>
			<hr />
			<Stack my={4}>
				<TableContainer>
					<Table variant="unstyled">
						<TableCaption>Invitations are listed above</TableCaption>
						<Thead>
							<Tr>
								<Th>Invited By</Th>
								<Th>Recieve On</Th>
								<Th>Status</Th>
							</Tr>
						</Thead>

						<Tbody>
							{userInvitations.map((invitation) => {
								return (
									<Tr key={invitation.id} fontSize="14px">
										<Td
											fontWeight="semibold"
											py={8}
											display="flex"
											alignItems="center"
										>
											<Box mr={2}>
												<MdOutlineAlternateEmail color="blue" />
											</Box>
											{invitation.invited_byUser_email}
										</Td>
										<Td>{invitation.created_at}</Td>
										<Td
											fontWeight="semibold"
											display="flex"
											alignItems="center"
										>
											<Box mr={2}>
												<GrStatusCriticalSmall color="violet" />
											</Box>
											{invitation.status}
										</Td>
										<Td isNumeric>
											<Button
												isDisabled={
													invitation.status !== 'pending' ? true : false
												}
												_disabled={{ cursor: 'not-allowed' }}
												mx={2}
												size="sm"
												variant="blue"
											>
												Accept
											</Button>
										</Td>
										<Td>
											<Button
												isDisabled={
													invitation.status !== 'pending' ? true : false
												}
												_disabled={{ cursor: 'not-allowed' }}
												mx={2}
												size="sm"
												variant="red"
											>
												Reject
											</Button>
										</Td>
									</Tr>
								);
							})}
						</Tbody>
					</Table>
				</TableContainer>
			</Stack>
		</Stack>
	);
};

export default Invitations;
