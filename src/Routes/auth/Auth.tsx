import { Box, Image } from '@chakra-ui/react';
import React, { ReactNode, useEffect, useState } from 'react';

import LoadingSpinner from '../../components/Spinner';
import supabase from '../../lib/api';
import Logo from '../../assets/logoQ.png';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth/auth-slice';
import { RootState } from '../../store';

interface MyComponentProps {
	children: ReactNode;
}

const Auth: React.FC<MyComponentProps> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		const authListener = supabase.auth.onAuthStateChange((event, session) => {
			if (session) {
				dispatch(authActions.set_user(session.user));
			} else {
				dispatch(authActions.set_user(null));
			}
			setIsLoading(false);
		});

		// Cleanup the subscription when the component unmounts
		return () => {
			authListener.data.subscription.unsubscribe();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isLoading) {
		return (
			<Box display="flex" alignItems="center" justifyContent="center" mt="20%">
				<Image src={Logo} alt="logo" w={20} mr={8} />

				<LoadingSpinner />
			</Box>
		);
	}

	return <>{children}</>;
};

export default Auth;
