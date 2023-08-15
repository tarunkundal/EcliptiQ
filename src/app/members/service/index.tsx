import supabase from '../../supabase';
import { MemberTable } from '../types';

// fetch all teams Members
export const _fetchAllTeamsMembers = async (
	team_id: any
): Promise<{
	data: MemberTable[] | null;
	error: any;
}> => {
	return await supabase.from('members').select().eq('team_id', team_id);
};
