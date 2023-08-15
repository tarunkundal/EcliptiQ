import {
	Avatar,
	Box,
	Center,
	Flex,
	Heading,
	Stack,
	Text,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { useAppSelector } from '../app/store';
import { TeamTable } from '../app/team/types';
import Routes from '../Routes';

const WorkspaceSelect = (prop: { onselect: (arg0: TeamTable) => void }) => {
	const teams = useAppSelector((state) => state.teams.teams);
	const user = useAppSelector((state) => state.user.user);
	const history = useHistory();

	if (teams.length <= 1) return;

	const handleWorkspace = (props: TeamTable) => {
		prop.onselect(props);
		console.log(props);
		history.push(Routes.DASHBOARD);
	};

	return (
		<Stack
			m="auto"
			mt={{ base: '', md: '10%' }}
			boxShadow="md"
			w={{ base: '95%', md: '60%' }}
			p={10}
		>
			<Center mb="10%" display="flex" flexDirection="column">
				<Heading>Select your workspace</Heading>
				<Text
					fontWeight="semibold"
					fontSize="22px"
					color="blue"
					mt={4}
					textAlign="center"
				>
					{user?.email}
				</Text>
			</Center>

			<Flex mx="auto" display={{ base: 'inline-grid', md: 'flex' }}>
				{teams.map((team) => {
					return (
						<Box
							bg="blue1"
							rounded="2xl"
							boxSize="150px"
							border="2px"
							borderColor="pink1"
							p={2}
							m={6}
							key={team.id}
						>
							<Flex
								justifyContent="space-around"
								alignItems="center"
								bg="white"
								rounded="2xl"
								p={2}
								h="full"
								w="full"
								flexDirection="column"
								cursor="pointer"
								onClick={() => handleWorkspace(team)}
							>
								<Avatar />
								<Heading fontSize="25px">{team.name}</Heading>
							</Flex>
						</Box>
					);
				})}
			</Flex>
		</Stack>
	);
};

export default WorkspaceSelect;
