import { Box } from '@chakra-ui/react';
import Header from '../../Header';
import UserProfileCard from '../../profile/UserProfileCard';
import Sidebar from '../../sidebar';

const Dashboard = () => {
	return (
		<>
			<Header />
			<Sidebar />
			{/* main content */}
			<Box ml={{ base: 0, md: '200px' }} p={4}>
				<UserProfileCard />
			</Box>
		</>
	);
};

export default Dashboard;
