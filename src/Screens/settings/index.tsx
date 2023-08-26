import { Box } from '@chakra-ui/react';
import React from 'react';

import TeamList from '../../app/team/components/TeamList';
import SettingsSidebar from './Sidebar';

const Settings = () => {
	return (
		<>
			<SettingsSidebar />
			<Box ml="200px">
				<TeamList />
			</Box>
		</>
	);
};

export default Settings;
