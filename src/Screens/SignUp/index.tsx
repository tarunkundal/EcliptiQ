import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import supabase from '../../app/supabase';
import sideVideo from '../../assets/signup-side.mp4';
import Logo from '../../components/Logo';
import LoadingSpinner from '../../components/Spinner';
import useCustomToast from '../../hooks/useToastHook';
import Routes from '../../Routes';

const SignUp = () => {
	const customToast = useCustomToast();
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSignup = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		// some validations
		if (!email || !password || !confirmPassword) {
			customToast({
				title: 'Please enter all fields.',
				status: 'error',
			});
			return;
		}
		if (password !== confirmPassword) {
			customToast({
				title: 'Password don`t match. Please retry.',
				status: 'error',
			});
			return;
		}
		if (password.length < 8) {
			customToast({
				title: 'To short Password',
				description: 'Enter password length must be equal or greater then 8',
				status: 'error',
				duration: 5000,
			});

			return;
		}

		// signup
		setLoading(true);
		const { data, error } = await supabase.auth.signUp({ email, password });
		setLoading(false);
		if (!error && data) {
			customToast({
				title:
					'Registration Successful. Check your email to confirm your account',
				status: 'success',
				duration: 5000,
			});
			history.push(Routes.LOGIN);
		} else if (error && !data.user) {
			customToast({
				title: `Error while signUp, ${error.message}`,
				status: 'error',
			});
		}

		setEmail('');
		setPassword('');
		setConfirmPassword('');
	};

	return (
		<Stack>
			<Flex
				justifyContent="space-between"
				alignItems="center"
				p={2}
				paddingX={{ base: 2, md: '4%' }}
				marginX="auto"
				w="full"
				boxShadow="md"
			>
				<Logo size={{ base: 12, md: 16 }} />
				<Flex justifyContent="space-around" alignItems="center">
					<Text mr={{ base: 2, md: 6 }} fontSize={{ base: '14px', md: '16px' }}>
						Already signed up?{' '}
					</Text>
					<Button variant="blue" size={{ base: 'sm', md: 'md' }}>
						<Link to={Routes.LOGIN} style={{ color: 'white' }}>
							Login
						</Link>
					</Button>
				</Flex>
			</Flex>
			<Stack>
				<Flex
					w={{ base: '95%', md: '80%' }}
					m="auto"
					justifyContent="space-between"
					p={6}
					alignItems="center"
				>
					<Stack
						w={{ base: '100%', md: '40%' }}
						m={{ base: 'auto', md: 0 }}
						gap={{ base: 9, md: 12 }}
					>
						<Heading
							textAlign={{ base: 'center', md: 'unset' }}
							fontSize={{ base: '25px', md: '3xl' }}
						>
							SignUp
						</Heading>

						<form onSubmit={handleSignup}>
							<FormControl mb={4}>
								<FormLabel fontWeight="bold">Email address</FormLabel>
								<Input
									border="2px"
									type="email"
									placeholder="Enter your email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</FormControl>
							<FormControl my={4}>
								<FormLabel fontWeight="bold">Password</FormLabel>

								<Input
									border="2px"
									type="password"
									placeholder="Enter password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</FormControl>
							<FormControl my={4}>
								<FormLabel fontWeight="bold">Confirm Password</FormLabel>

								<Input
									border="2px"
									type="password"
									placeholder="Confirm entered password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
							</FormControl>
							<Button my={4} type="submit" variant="red" w="full" size="lg">
								{loading ? <LoadingSpinner /> : 'Sign up with Email'}
							</Button>
							<Text borderTop="1px" pt={4} fontSize="14px" textAlign="center">
								Already signed up? <Link to={Routes.LOGIN}>Go to login</Link>
							</Text>
						</form>
					</Stack>
					<Stack display={{ base: 'none', md: 'block' }}>
						<Box borderRadius="2xl" overflow="hidden">
							<video width="500px" autoPlay loop muted>
								<source src={sideVideo} type="video/mp4" />
								Your browser does not support the video tag.
							</video>
						</Box>
						<Box
							boxShadow="2xl"
							borderRadius="2xl"
							mt="-20%"
							ml="40%"
							w="350px"
							fontWeight="bold"
							lineHeight="31px"
							fontSize="18px"
							p="6"
						>
							<Text fontFamily="Merienda" fontStyle="italic">
								Before <b> EcliptiQ</b>, my tasks lists were scattered all
								around! Now, everything is in order and in one place.
							</Text>
							<Text mt={4}>– Matt M.</Text>
						</Box>
					</Stack>
				</Flex>
			</Stack>
		</Stack>
	);
};

export default SignUp;
