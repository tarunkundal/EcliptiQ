import { Box } from '@chakra-ui/react';
import { Route } from 'react-router-dom';

import Routes from '../../Routes';
import AllTasks from '../../tasks';
import TaskForm from '../../tasks/TaskForm';
import CreateTeamForm from '../../teams/CreateTeamForm';
import UserSetting from '../../user/UserSetting';

const DashboardBody = () => {
	return (
		<Box ml={{ base: 0, md: '200px' }} p={2} pt="50px">
			<Route exact path={Routes.DASHBOARD} component={AllTasks} />
			<Route exact path={Routes.USER_SETTING} component={UserSetting} />
			<Route exact path={Routes.NEWTASK} component={TaskForm} />
			<CreateTeamForm />
		</Box>
	);
};

export default DashboardBody;
