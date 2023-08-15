export interface MemberState {
	members: MemberTable[];
}

export interface MemberTable {
	id: string;
	team_id: string | undefined;
	user_id: string | undefined;
	role: string;
	user_email: string | undefined;
}

export interface SetMemberActionPayload {
	members: MemberTable[];
}
