import supabase from '../../supabase';
import { InvitationTable } from '../types';

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
