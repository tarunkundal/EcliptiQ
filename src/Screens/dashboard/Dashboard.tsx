import { useEffect } from 'react';

import { _fetchInvitations } from '../../app/invitation/service';
import { invitationActions } from '../../app/invitation/slice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { _fetchAllTeamsOfUser } from '../../app/team/service';
import { teamActions } from '../../app/team/slice';
import Sidebar from '../../components/Sidebar';
import DashboardBody from './DashboardBody';

const Dashboard = () => {
	const user = useAppSelector((state) => state.user.user);
	const dispatch = useAppDispatch();

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

	// fetching userteams
	useEffect(() => {
		const fetchUserAllTeams = async () => {
			const { data, error } = await _fetchAllTeamsOfUser(user?.id);
			if (data && !error) {
				dispatch(teamActions.set_team({ teams: data }));
			}
		};
		fetchUserAllTeams();
	}, []);

	return (
		<>
			<Sidebar />

			<DashboardBody />
		</>
	);
};

export default Dashboard;
