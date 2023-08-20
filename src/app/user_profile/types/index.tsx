export interface UserProfileState {
	userProfile: UserProfile | null;
}

export interface UserProfile {
	id: string;
	userName: string;
	user_id: string;
	user_email: string;
	avtar_url: string;
	bio: string;
	created_at: any;
}

export interface SetUserProfileActionPayload {
	userProfile: UserProfile | null;
}

export interface UserProfileUpdate {
	userName: string | undefined;
	bio: string | undefined;
}

export interface UserProfileAvatarUpdate {
	userName: string | undefined;
	bio: string | undefined;
}

export interface UpdateUserProfileActionPayload {
	updatedData: UserProfileUpdate;
}

export interface UpdateUserProfileAvatarActionPayload {
	updatedData: UserProfileAvatarUpdate;
}
