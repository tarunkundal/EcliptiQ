import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	Stack,
	Text,
} from '@chakra-ui/react';
import { memo, useState } from 'react';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';

import supabase from '../../app/supabase';
import sideVideo from '../../assets/loginside.mp4';
import Logo from '../../components/Logo';
import LoadingSpinner from '../../components/Spinner';
import useCustomToast from '../../hooks/useToastHook';
import Routes from '../../Routes';
import GoogleLogIn from './GoogleLogin';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const customToast = useCustomToast();
	const history = useHistory();

	// login handler
	const handleLoginHandler = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		setLoading(true);
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		setLoading(false);

		if (data.user) {
			customToast({
				title: 'Welcome to EcliptiQ',
				description: 'Login Sucessfully',
				status: 'success',
			});
			history.push('https://eclipti-q.vercel.app');
		}
		if (error) {
			customToast({
				title: error.message,
				status: 'error',
			});
			return;
		}

		setEmail('');
		setPassword('');
	};

	return (
		<Stack>
			<Flex
				justifyContent="space-between"
				alignItems="center"
				p={2}
				paddingX={{ base: 2, md: '4%' }}
				boxShadow="md"
				w="full"
			>
				<Logo size={{ base: 12, md: 16 }} />
				<Flex justifyContent="space-around" alignItems="center">
					<Text fontSize={{ base: '12px', md: '16px' }} mr={{ base: 2, md: 6 }}>
						Don`t have an account?
					</Text>
					<Button variant="blue" size={{ base: 'sm', md: 'md' }}>
						<Link to={Routes.REGISTER} style={{ color: 'white' }}>
							Sign Up
						</Link>
					</Button>
				</Flex>
			</Flex>

			<Stack
				display="flex"
				flexDirection="row"
				alignItems="center"
				justifyContent="space-between"
				w={{ base: '95%', md: '80%' }}
				m="auto"
				p={6}
			>
				<Stack
					w={{ base: '100%', md: '40%' }}
					m={{ base: 'auto', md: 0 }}
					gap={{ base: 9, md: 10 }}
				>
					<Heading
						textAlign={{ base: 'center', md: 'unset' }}
						fontSize={{ base: '25px', md: '3xl' }}
					>
						Welcome Back!
					</Heading>
					<GoogleLogIn />
					<form onSubmit={handleLoginHandler}>
						<FormControl mb={4}>
							<FormLabel fontWeight="bold">Email address</FormLabel>
							<InputGroup alignItems="center">
								<InputLeftElement pointerEvents="none">
									<AiOutlineMail />
								</InputLeftElement>
								<Input
									placeholder="Enter your email"
									type="email"
									isRequired
									border="2px"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</InputGroup>
						</FormControl>
						<FormControl my={4}>
							<FormLabel fontWeight="bold">Password</FormLabel>

							<InputGroup alignItems="center">
								<InputLeftElement pointerEvents="none">
									<AiFillLock color="gray.300" />
								</InputLeftElement>

								<Input
									placeholder="Enter password"
									type="password"
									isRequired
									border="2px"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</InputGroup>
						</FormControl>

						<Button w="full" my={4} variant="blue" size="lg" type="submit">
							{loading ? <LoadingSpinner /> : 'Login'}
						</Button>
						<Text textAlign="center" fontSize="14px" pt={4} borderTop="1px">
							Don`t have an account yet?
							<Link to={Routes.REGISTER}> Sign up</Link>{' '}
						</Text>
					</form>
				</Stack>

				<Box
					display={{ base: 'none', md: 'block' }}
					borderRadius="2xl"
					overflow="hidden"
				>
					<video width="460" height="500px" autoPlay loop muted>
						<source src={sideVideo} type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				</Box>
			</Stack>
		</Stack>
	);
};

export default memo(Login);
