export interface UserState {
	user: User | null;
}

export interface User {
	id: string;
	email: string | undefined;
	username: string;
}

export interface SetUserActionPayload {
	user: User | null;
}
