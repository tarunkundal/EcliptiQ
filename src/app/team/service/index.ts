import supabase from '../../supabase';
import { TeamTable } from '../types';

// fetch all teams
export const _fetchAllTeams = async (): Promise<{
	data: TeamTable[] | null;
	error: any;
}> => {
	return await supabase.from('teams').select('*');
};

// fetching all teams by user_id
export const _fetchAllTeamsOfUser = async (
	user_id: any
): Promise<{ data: TeamTable[] | null; error: any }> => {
	return await supabase.from('teams').select().eq('creater_id', user_id);
};

// fetching all teams which user creates or is member of. (error in this function)
export const _fetchAllTeamsOfUserCreatesOrMember = async (
	user_id: any
): Promise<{ data: TeamTable[] | null; error: any }> => {
	const memberOfTeams = await supabase
		.from('members')
		.select('team_id')
		.eq('user_id', user_id);

	const createdByUser = await supabase
		.from('teams')
		.select('*')
		.eq('creater_id', user_id);

	const teams: { data: TeamTable[] | null; error: any } = {
		data: [], // Initialize with an empty array
		error: null,
	};

	if (memberOfTeams.data && createdByUser.data) {
		const teamIds = new Set([
			...createdByUser.data.map((team) => team.id),
			...memberOfTeams.data.map((member) => member.team_id),
		]);

		// Fetch the full team details using the collected team IDs
		const teamsResponse = await supabase
			.from('teams')
			.select('*')
			.in('id', [...teamIds]);

		console.log(teams.data, teams.error);
		teams.data = teamsResponse.data || []; // Assign the fetched data or an empty array
		teams.error = teamsResponse.error;
	}

	return { data: teams.data, error: teams.error };
};

// creating team
export const _creatingNewTeam = async ({
	userId,
	teamName,
}: {
	userId: any;
	teamName: string;
}): Promise<{
	data: TeamTable[] | null;
	error: any;
}> => {
	return await supabase
		.from('teams')
		.insert([
			{
				creater_id: userId,
				name: teamName,
			},
		])
		.select();
};

// updating teamname
export const _updateTeamName = async ({
	teamId,
	teamName,
}: {
	teamId: any;
	teamName: string | undefined;
}): Promise<{ data: TeamTable[] | null; error: any }> => {
	return await supabase
		.from('teams')
		.update({ name: teamName })
		.eq('id', teamId)
		.select();
};

// delete team
export const _deleteTeam = async (teamId: string): Promise<{ error: any }> => {
	return await supabase.from('teams').delete().eq('id', teamId);
};
