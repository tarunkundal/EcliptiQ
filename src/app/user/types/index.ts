export interface UserState {
	user: UserProfile | null;
}

export interface UserProfile {
	id: string;
	email: string | undefined;
	username: string;
	avatar_url: string;
}

export interface SetUserActionPayload {
	user: UserProfile | null;
}

export interface UpdateUsernameActionPayload {
	username: string;
}
