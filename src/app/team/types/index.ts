export interface TeamState {
	teams: TeamTable[];
}

export interface TeamTable {
	id: string | any;
	name: string;
	creater_id: string;
	created_at: string | any;
}

export interface SetTeamActionPayload {
	teams: TeamTable[];
}

export interface UpdateTeamActionPayload {
	teamId: any;
	teamName: string | any;
}

export interface AddTeamActionPayload {
	team: TeamTable;
}

export interface DeleteTeamActionPayload {
	teamId: any;
}
