import { Center } from '@chakra-ui/react';
import React, { ReactNode, useEffect, useState } from 'react';

import Logo from '../../components/Logo';
import LoadingSpinner from '../../components/Spinner';
import supabase from '../../lib/api';
import { useAuthStore } from '../../store/auth/AuthContextProvider';

interface MyComponentProps {
	children: ReactNode;
}

const Auth: React.FC<MyComponentProps> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const { set_user } = useAuthStore();

	useEffect(() => {
		const authListener = supabase.auth.onAuthStateChange((event, session) => {
			if (session) {
				set_user(session.user);
			} else {
				set_user(null);
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
			<Center h="100vh" w="100vw">
				<Logo size="2xl" />
				<LoadingSpinner />
			</Center>
		);
	}

	return <>{children}</>;
};

export default Auth;
