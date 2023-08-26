import { Box, Image } from '@chakra-ui/react';
import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import supabase from '../../app/supabase';
import { userActions } from '../../app/user/slice';
import { User } from '../../app/user/types';
import Logo from '../../assets/logoQ.png';
import LoadingSpinner from '../../components/Spinner';

interface MyComponentProps {
	children: ReactNode;
}

const Auth: React.FC<MyComponentProps> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		const authListener = supabase.auth.onAuthStateChange((event, session) => {
			if (session) {
				const fetchedUser: User = {
					id: session.user.id,
					email: session.user.email,
					username: session.user?.user_metadata.name,
				};

				dispatch(userActions.setUser({ user: fetchedUser }));
			} else {
				dispatch(userActions.setUser({ user: null }));
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
