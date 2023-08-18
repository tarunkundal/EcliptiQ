export interface MemberState {
	members: MemberTable[];
}

export interface MemberTable {
	id: string;
	team_id: string;
	user_id: string;
	role: string;
	user_email: string;
}

export interface SetMemberActionPayload {
	members: MemberTable[] | null;
}

export interface AddMemberActionPayload {
	member: MemberTable;
}

export interface UpdateMemberActionPayload {
	memberId: any;
	role: string | any;
}

export interface DeleteMemberActionPayload {
	memberId: any;
}
