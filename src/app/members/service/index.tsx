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

// fetching all members from membertable

// add new team member
export const _addNewTeamMember = async ({
	team_id,
	user_id,
	role,
	user_email,
}: {
	team_id: any;
	user_id: any;
	role: string;
	user_email: string | undefined;
}): Promise<{
	data: MemberTable[] | null;
	error: any;
}> => {
	return await supabase
		.from('members')
		.insert([
			{
				team_id: team_id,
				user_id: user_id,
				role: role,
				user_email: user_email,
			},
		])
		.select();
};

// delete member by id
export const _deleteMemberById = async (
	memberId: string
): Promise<{ error: any }> => {
	return await supabase.from('members').delete().eq('id', memberId);
};
