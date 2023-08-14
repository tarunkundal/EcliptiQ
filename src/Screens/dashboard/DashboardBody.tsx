import { Box } from '@chakra-ui/react';
import { Route } from 'react-router-dom';

import AllTasks from '../../app/tasks/components';
import TaskForm from '../../app/tasks/components/TaskForm';
import UserSetting from '../../app/user/components/UserSetting';
import Routes from '../../Routes';

const DashboardBody = () => {
	return (
		<Box ml={{ base: 0, md: '200px' }} p={2}>
			<Route exact path={Routes.DASHBOARD} component={AllTasks} />
			<Route exact path={Routes.USER_SETTING} component={UserSetting} />
			<Route exact path={Routes.NEWTASK} component={TaskForm} />
		</Box>
	);
};

export default DashboardBody;
