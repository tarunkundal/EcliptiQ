export interface TeamState {
	teams: TeamTable[];
}

export interface TeamTable {
	id: string;
	name: string;
	creater_id: string;
	created_at: string | any;
}
export interface SetTeamActionPayload {
	teams: TeamTable[];
}
