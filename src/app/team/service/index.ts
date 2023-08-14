import supabase from '../../supabase';
import { TeamTable } from '../types';

export const _fetchAllTeams = async (): Promise<{
	data: TeamTable[] | null;
	error: any;
}> => {
	return await supabase.from('teams').select('*');
};
