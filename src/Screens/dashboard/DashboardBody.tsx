import { Box } from '@chakra-ui/react';
import { Route } from 'react-router-dom';

import InvitationAcceptForm from '../../app/invitation/components/InvitationAcceptForm';
import AllTasks from '../../app/tasks/components';
import TaskForm from '../../app/tasks/components/TaskForm';
import CreateTeamForm from '../../app/team/components/CreateTeamForm';
import TeamDetailPage from '../../app/team/components/TeamDetailPage';
import TeamList from '../../app/team/components/TeamList';
import UserSetting from '../../app/user/components/UserSetting';
import Routes from '../../Routes';

const DashboardBody = () => {
	return (
		<Box ml={{ base: 0, md: '200px' }} p={2}>
			<Route exact path={Routes.DASHBOARD} component={AllTasks} />
			<Route exact path={Routes.USER_SETTING} component={UserSetting} />
			<Route exact path={Routes.NEWTASK} component={TaskForm} />
			<Route exact path={Routes.CREATE_TEAM} component={CreateTeamForm} />
			<Route exact path={Routes.INVITATIONS} component={InvitationAcceptForm} />
			<Route exact path={Routes.TEAMDETAIL} component={TeamDetailPage} />
			<Route exact path={Routes.TEAMS} component={TeamList} />
		</Box>
	);
};

export default DashboardBody;
