import { Box } from '@chakra-ui/react';

const SettingsSidebar = () => {
	return (
		<Box
			position="fixed"
			top={0}
			height="100vh"
			p={4}
			w={{ base: '50%', md: '200px' }}
			bg="gray.50"
			transition="left 0.3s"
			boxShadow={{ md: 'md' }}
			zIndex={2}
			fontSize="14px"
		>
			{/* Sidebar content */}
		</Box>
	);
};

export default SettingsSidebar;
