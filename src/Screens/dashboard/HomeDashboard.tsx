import { Heading } from '@chakra-ui/react';

import { useAuthStore } from '../../store/auth/AuthContextProvider';
import Logout from '../../Routes/auth/Logout';

const HomeDashboard = () => {
	const { user } = useAuthStore();

	console.log(user);

	return (
		<>
			<Heading>Home protected page</Heading>
			<Logout />
		</>
	);
};

export default HomeDashboard;
