import { useEffect } from 'react';

import { _fetchInvitations } from '../../app/invitation/service';
import { invitationActions } from '../../app/invitation/slice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import supabase from '../../app/supabase';
import { _fetchAllTasks } from '../../app/tasks/service';
import { taskActions } from '../../app/tasks/slice';
import { teamActions } from '../../app/team/slice';
import { _fetchingUserProfileData } from '../../app/user_profile/services';
import { userProfileActions } from '../../app/user_profile/slice';
import Sidebar from '../../components/Sidebar';
import useCustomToast from '../../hooks/useToastHook';
import DashboardBody from './DashboardBody';

const Dashboard = () => {
	const user = useAppSelector((state) => state.user.user);
	const dispatch = useAppDispatch();
	const customToast = useCustomToast();

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

		// fetching userteams which he creats or is member of
		const fetchTeamsCreatedByUserOrIsMember = async () => {
			const memberOfTeams = await supabase
				.from('members')
				.select('team_id')
				.eq('user_id', user?.id);
			const createdByUser = await supabase
				.from('teams')
				.select('*')
				.eq('creater_id', user?.id);
			if (memberOfTeams.data && createdByUser.data) {
				const teamIds = new Set([
					...createdByUser.data.map((team) => team.id),
					...memberOfTeams.data.map((member) => member.team_id),
				]);
				// Fetch the full team details using the collected team IDs
				const teams = await supabase
					.from('teams')
					.select('*')
					.in('id', [...teamIds]);
				if (teams.data) {
					dispatch(teamActions.set_team({ teams: teams.data }));
				} else if (teams.error) {
					customToast({ title: teams.error.message, status: 'error' });
				}
			}
		};
		fetchTeamsCreatedByUserOrIsMember();
	}, []);

	return (
		<>
			<Sidebar />

			<DashboardBody />
		</>
	);
};

export default Dashboard;
