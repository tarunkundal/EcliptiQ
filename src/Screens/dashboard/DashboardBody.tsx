import { Box } from '@chakra-ui/react';
import { Route } from 'react-router-dom';

import Invitations from '../../app/invitation/components/Invitations';
import MembersList from '../../app/members/components/MembersList';
import AllTasks from '../../app/tasks/components';
import TaskDetail from '../../app/tasks/components/TaskDetail';
import TaskForm from '../../app/tasks/components/TaskForm';
import CreateTeamForm from '../../app/team/components/CreateTeamForm';
import TeamDetailPage from '../../app/team/components/TeamDetailPage';
import TeamList from '../../app/team/components/TeamList';
import UserSetting from '../../app/user/components/UserSetting';
import Home from '../../components/Home';
import Routes from '../../Routes';

const DashboardBody = () => {
	return (
		<Box ml={{ base: 0, md: '200px' }} p={2}>
			<Route exact path={Routes.DASHBOARD} component={Home} />
			<Route exact path={Routes.TASKS} component={AllTasks} />
			<Route exact path={Routes.USER_SETTING} component={UserSetting} />
			<Route exact path={Routes.NEWTASK} component={TaskForm} />
			<Route exact path={Routes.CREATE_TEAM} component={CreateTeamForm} />
			<Route exact path={Routes.INVITATIONS} component={Invitations} />
			<Route exact path={Routes.TEAMDETAIL} component={TeamDetailPage} />
			<Route exact path={Routes.TEAMS} component={TeamList} />
			<Route exact path={Routes.TEAMSMEMBERS} component={MembersList} />
			<Route exact path={Routes.TASKDETAIL} component={TaskDetail} />
		</Box>
	);
};

export default DashboardBody;
