import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import { MouseEventHandler, useState } from 'react';
import { useHistory } from 'react-router-dom';

import supabase from '../../app/supabase';
import Modal from '../../components/Modal';
import LoadingSpinner from '../../components/Spinner';
import useCustomToast from '../../hooks/useToastHook';
import Routes from '..';

const Logout = (props: {
	// eslint-disable-next-line no-undef
	onClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement> | undefined;
}) => {
	const [loading, setLoading] = useState(false);
	const customToast = useCustomToast();
	const history = useHistory();

	const logoutHandler = async () => {
		setLoading(true);

		const { error } = await supabase.auth.signOut();
		setLoading(false);

		if (error) {
			customToast({
				title: 'Error while loging out.',
				description: error.message,
				status: 'error',
			});
		} else {
			history.push(Routes.LOGIN);
			window.location.reload();
		}
	};

	return (
		<Modal onClose={props.onClose}>
			<Stack
				mt={4}
				p={4}
				pb={6}
				gap={4}
				rounded="lg"
				direction="column"
				mx="auto"
			>
				<Text textAlign="center" fontSize="xl" fontWeight="bold">
					Are you sure?
				</Text>
				<Text fontSize="lg" textAlign="center">
					You want to Logout
				</Text>
				<Flex justifyContent="space-around">
					<Button rounded="full" w="40%" variant="red" onClick={logoutHandler}>
						{loading ? (
							<>
								{'Logingout  '}+ <LoadingSpinner />
							</>
						) : (
							'Log Out'
						)}
					</Button>
					<Button
						variant="outline"
						colorScheme="red"
						w="40%"
						border="2px"
						borderColor="red"
						onClick={props.onClose}
						rounded="full"
					>
						Close
					</Button>
				</Flex>
			</Stack>
		</Modal>
	);
};

export default Logout;
