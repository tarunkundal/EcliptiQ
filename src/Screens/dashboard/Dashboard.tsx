import { Heading } from '@chakra-ui/react';

import Logout from '../../Routes/auth/Logout';
import Header from '../../components/Header';
import UserProfileCard from '../../profile/UserProfileCard';

const Dashboard = () => {
	return (
		<>
			<Header />
			<UserProfileCard />
			<Logout />
		</>
	);
};

export default Dashboard;
