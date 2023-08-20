import {
	Box,
	Button,
	Flex,
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
import React, { memo } from 'react';
import { BiPlus } from 'react-icons/bi';
import { BsMicrosoftTeams } from 'react-icons/bs';
import { LuSettings2 } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import Routes from '../../../Routes';
import { useAppSelector } from '../../store';

const TeamList = () => {
	const teams = useAppSelector((state) => state.teams.teams);

	return (
		<Stack w="full">
			<Stack
				flexDirection="row"
				alignItems="center"
				justifyContent="space-between"
				p={4}
			>
				<Text fontWeight="semibold">Your Teams</Text>
				<Link to={Routes.CREATE_TEAM}>
					<Button size="sm" variant="blue" w="fit-content">
						{' '}
						<BiPlus />
						<Text fontWeight="normal" ml={2}>
							Add Team
						</Text>
					</Button>
				</Link>
			</Stack>
			<hr />
			<TableContainer>
				<Table variant="simple">
					<TableCaption>
						{teams.length >= 1
							? 'Your teams are listed above'
							: 'You have no teams.Please create it.'}
					</TableCaption>
					<Thead>
						<Tr>
							<Th>Name</Th>
							<Th>Created At</Th>
							<Th>Members</Th>
							<Th isNumeric>Team Setting</Th>
						</Tr>
					</Thead>
					<Tbody>
						{teams.map((team) => {
							return (
								<Tr key={team.id}>
									<Td>
										<Flex alignItems="center">
											<Box p={1} bg="pink1" rounded="md">
												<BsMicrosoftTeams color="red" />
											</Box>
											<Text ml={2}>{team.name}</Text>
										</Flex>
									</Td>
									<Td>{team.created_at}</Td>
									<Td>
										<Link
											to={`/teams/members/${team.id}`}
											style={{ color: 'white' }}
										>
											<Button size="sm" variant="blue">
												{' '}
												See Members
											</Button>
										</Link>
									</Td>
									<Td isNumeric>
										<Link to={`/teams/${team.id}`} style={{ color: 'white' }}>
											<Button variant="red" size="sm">
												<LuSettings2 />
											</Button>
										</Link>
									</Td>
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</TableContainer>
		</Stack>
	);
};

export default memo(TeamList);
