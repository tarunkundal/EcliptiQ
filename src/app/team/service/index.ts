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
