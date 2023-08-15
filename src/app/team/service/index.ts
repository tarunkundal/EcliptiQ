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
