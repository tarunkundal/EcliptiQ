import { Heading } from '@chakra-ui/react';

import Logout from '../../Routes/auth/Logout';

const HomeDashboard = () => {
	return (
		<>
			<Heading>Home protected page</Heading>
			<Logout />
		</>
	);
};

export default HomeDashboard;
