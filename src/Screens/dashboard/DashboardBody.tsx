import { Box } from '@chakra-ui/react';
import { Route } from 'react-router-dom';

import Invitations from '../../app/invitation/components/Invitations';
import MembersList from '../../app/members/components/MembersList';
import AllTasks from '../../app/tasks/components';
import TaskDetail from '../../app/tasks/components/TaskDetail';
import TaskForm from '../../app/tasks/components/TaskForm';
import TaskUpdateForm from '../../app/tasks/components/TaskUpdateForm';
import CreateTeamForm from '../../app/team/components/CreateTeamForm';
import TeamDetailPage from '../../app/team/components/TeamDetailPage';
import TeamList from '../../app/team/components/TeamList';
import UserSetting from '../../app/user_profile/components/UserSetting';
import Routes from '../../Routes';
import Settings from '../settings';

const DashboardBody = () => {
	return (
		<>
			<Box ml={{ base: 0, md: '200px' }}>
				<Route exact path={Routes.DASHBOARD} component={AllTasks} />
				<Route exact path={Routes.TASKS} component={AllTasks} />
				<Route exact path={Routes.USER_SETTING} component={UserSetting} />
				<Route exact path={Routes.NEWTASK} component={TaskForm} />
				<Route exact path={Routes.INVITATIONS} component={Invitations} />
				<Route exact path={Routes.CREATE_TEAM} component={CreateTeamForm} />
				<Route exact path={Routes.TEAMDETAIL} component={TeamDetailPage} />
				<Route exact path={Routes.TEAMS} component={TeamList} />
				<Route exact path={Routes.TEAMSMEMBERS} component={MembersList} />
				<Route exact path={Routes.TASKDETAIL} component={TaskDetail} />
				<Route exact path={Routes.UPDATE_TASK} component={TaskUpdateForm} />
				<Route exact path={Routes.SETTINGS} component={Settings} />
			</Box>
		</>
	);
};

export default DashboardBody;
