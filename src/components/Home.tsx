import { Box, Flex, Heading, Stack } from '@chakra-ui/react';

import { useAppSelector } from '../app/store';

const Home = () => {
	const teams = useAppSelector((state) => state.teams.teams);

	return (
		<Stack mt={12} p={10}>
			<Heading textAlign="center">Select WorkSpace</Heading>
			<Stack mt={16} w="60%" mx="auto">
				<Flex justifyContent="center">
					{teams.map((team) => {
						return (
							<Box
								cursor="pointer"
								w={200}
								h={100}
								key={team.id}
								rounded="lg"
								padding={2}
								bg="blue"
								m={4}
								boxShadow="md"
								transition="ease-in-out 1s all"
								_hover={{ transform: 'scale(.93)', bg: 'pink' }}
							>
								<Box bg="white" rounded="2xl" h="full" w="full">
									<Heading
										color="pink_neon"
										pt={6}
										fontSize="25px"
										textAlign="center"
										_hover={{ color: 'red' }}
									>
										{team.name}
									</Heading>
								</Box>
							</Box>
						);
					})}
				</Flex>
			</Stack>
		</Stack>
	);
};

export default Home;
