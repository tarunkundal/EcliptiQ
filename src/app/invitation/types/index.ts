export interface InvitationState {
	invitations: InvitationTable[];
}

export interface InvitationTable {
	id: string;
	team_id: string;
	creater_id: string;
	created_at: string | any;
	status: string;
	invited_email: string;
	invited_by_userId: any;
	invited_byUser_email: string;
}

export interface SetInvitationActionPayload {
	invitations: InvitationTable[];
}

export interface UpdateInvitationStatusActionPayload {
	status: string;
	invitationId: string;
}
