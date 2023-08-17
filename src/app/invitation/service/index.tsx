import supabase from '../../supabase';
import { InvitationTable, InvitationTableWithTeamName } from '../types';

// fetch all invitations of the user
export const _fetchInvitations = async (
	user_email: string | undefined
): Promise<{
	data: InvitationTable[] | null;
	error: any;
}> => {
	return await supabase
		.from('invitations')
		.select()
		.eq('invited_email', user_email);
};

// update invitation
export const _updateInvitation = async ({
	status,
	invitationId,
}: {
	status: string;
	invitationId: any;
}) => {
	return await supabase
		.from('invitations')
		.update({ status: status })
		.eq('id', invitationId);
};

// add invitation
export const _addNewInvitation = async ({
	team_id,
	creater_id,
	status,
	invited_byUser_email,
	invited_by_userId,
	invited_email,
}: {
	team_id: string;
	creater_id: string;
	status: string;
	invited_email: string;
	invited_by_userId: any;
	invited_byUser_email: string;
}): Promise<{
	data: InvitationTable[] | null;
	error: any;
}> => {
	return await supabase
		.from('invitations')
		.insert([
			{
				team_id: team_id,
				creater_id: creater_id,
				status: status,
				invited_byUser_email: invited_byUser_email,
				invited_by_userId: invited_by_userId,
				invited_email: invited_email,
			},
		])
		.select();
};

// fetching Userinvitations with team name
export const _fetchInvitationsWithTeamName = async ({
	userEmail,
}: {
	userEmail: string | undefined;
}): Promise<{
	data: InvitationTableWithTeamName[] | null;
	error: any;
}> => {
	return await supabase
		.from('invitations')
		.select('*,teams:team_id (name)')
		.eq('invited_email', userEmail);
};
