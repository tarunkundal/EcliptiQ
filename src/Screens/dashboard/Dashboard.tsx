import { useEffect } from 'react';

import { _fetchInvitations } from '../../app/invitation/service';
import { invitationActions } from '../../app/invitation/slice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import supabase from '../../app/supabase';
import { _fetchAllTasks } from '../../app/tasks/service';
import { taskActions } from '../../app/tasks/slice';
import { _fetchAllTeamsOfUser } from '../../app/team/service';
import { teamActions } from '../../app/team/slice';
import { _fetchingUserProfileData } from '../../app/user_profile/services';
import { userProfileActions } from '../../app/user_profile/slice';
import Sidebar from '../../components/Sidebar';
import DashboardBody from './DashboardBody';

const Dashboard = () => {
	const user = useAppSelector((state) => state.user.user);
	const dispatch = useAppDispatch();

	// adding user to userprofile
	const addingUserToUserProfileData = async () => {
		await supabase
			.from('user_profile')
			.insert([{ user_id: user?.id, user_email: user?.email }])
			.select();
	};
	addingUserToUserProfileData();

	// fetching user invitations
	useEffect(() => {
		const fetchAllInvitations = async () => {
			const { data, error } = await _fetchInvitations(user?.email);

			if (data && !error) {
				dispatch(invitationActions.set_invitations({ invitations: data }));
			}
		};
		fetchAllInvitations();
	}, [dispatch, user?.email]);

	useEffect(() => {
		// fetching userteams which he creats or is member of
		const fetchUserAllTeams = async () => {
			const { data, error } = await _fetchAllTeamsOfUser(user?.id);

			if (data && !error) {
				dispatch(teamActions.set_team({ teams: data }));
			}
		};
		fetchUserAllTeams();

		// fetching tasks
		const fetchAllTasks = async () => {
			const { data, error } = await _fetchAllTasks();
			if (data && !error) {
				dispatch(taskActions.set_tasks({ tasks: data }));
			}
		};
		fetchAllTasks();

		// fetching userProfile data
		const fetchUserProfileData = async () => {
			const { data, error } = await _fetchingUserProfileData({
				user_id: user?.id,
			});
			if (data && !error) {
				dispatch(userProfileActions.setUserProfile({ userProfile: data }));
			}
		};
		fetchUserProfileData();
	}, []);

	return (
		<>
			<Sidebar />

			<DashboardBody />
		</>
	);
};

export default Dashboard;
