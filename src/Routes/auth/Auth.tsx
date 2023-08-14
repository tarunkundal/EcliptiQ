import { Box, Image } from '@chakra-ui/react';
import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import supabase from '../../app/supabase';
import { userActions } from '../../app/user/slice';
import { UserProfile } from '../../app/user/types';
import Logo from '../../assets/logoQ.png';
import LoadingSpinner from '../../components/Spinner';

interface MyComponentProps {
	children: ReactNode;
}

const Auth: React.FC<MyComponentProps> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	// const [isDataInserted, setIsDataInserted] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		const authListener = supabase.auth.onAuthStateChange((event, session) => {
			if (session) {
				const fetchedUser: UserProfile = {
					id: session.user.id,
					email: session.user.email,
					username: session.user?.user_metadata.name,
					avatar_url: session?.user.user_metadata.avatar_url,
				};

				dispatch(userActions.setUser({ user: fetchedUser }));

				// // checking weather the user data is already in the profile table or not
				// if (!isDataInserted) {
				// 	const checkUserData = async () => {
				// 		const id = session.user.id;
				// 		const { data } = await supabase
				// 			.from('user_profiles')
				// 			.select('user_id')
				// 			.eq('user_id', id);

				// 		if (data?.length === 0) {
				// 			setIsDataInserted(false);
				// 		} else {
				// 			setIsDataInserted(true);
				// 		}
				// 	};
				// 	checkUserData();
				// }
				// console.log(isDataInserted);

				// // enter data into userprofile table
				// if (!isDataInserted) {
				// 	const enterUserData = async () => {
				// 		const { data, error } = await supabase
				// 			.from('user_profiles')
				// 			.insert([
				// 				{
				// 					user_id: session.user.id,
				// 					email: session.user.email,
				// 					user_name: session.user?.user_metadata.name,
				// 				},
				// 			])
				// 			.select();
				// 		console.log(data, 'and', error);
				// 	};
				// 	enterUserData();
				// }
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
