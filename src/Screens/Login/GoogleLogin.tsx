import { Box, Image, Spinner, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import supabase from '../../app/supabase';
import googleSvg from '../../assets/google.svg';
import useCustomToast from '../../hooks/useToastHook';

const GoogleLogIn: React.FC = () => {
	const customToast = useCustomToast();
	const [isLoading, setIsLoading] = useState(false);

	const handleGoogleLogIn = async () => {
		setIsLoading(true);
		const { error, data } = await supabase.auth.signInWithOAuth({
			provider: 'google',
		});
		setIsLoading(false);

		if (error) {
			customToast({
				title: 'Error signing in with Google',
				description: error.message,
				status: 'error',
			});
		} else if (data) {
			customToast({
				title: 'Google sign-in successful',
				status: 'success',
			});
		}
	};

	return (
		<Box
			as="button"
			onClick={handleGoogleLogIn}
			border="1px"
			display="flex"
			alignItems="center"
			justifyContent="center"
			borderRadius="lg"
			borderColor="gray.200"
			_hover={{ borderColor: 'gray.400' }}
			mx="auto"
			w="190px"
			h="40px"
		>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<Image src={googleSvg} />
					<Text as="span" ml={2} fontWeight="bold" fontSize="14px">
						Log in with Google
					</Text>
				</>
			)}
		</Box>
	);
};

export default GoogleLogIn;
