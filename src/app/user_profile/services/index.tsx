import supabase from '../../supabase';
import { UserProfile, UserProfileUpdate } from '../types';

// fetching userProfile Data from userProfile table
export const _fetchingUserProfileData = async ({
	user_id,
}: {
	user_id: string | any;
}): Promise<{
	data: UserProfile | null;
	error: any;
}> => {
	return await supabase
		.from('user_profile')
		.select('*')
		.eq('user_id', user_id)
		.single();
};

// updating user profile with user_id
export const _updateUserProfile = async ({
	user_id,
	updatedData,
}: {
	user_id: string | any;
	updatedData: UserProfileUpdate;
}): Promise<{
	data: UserProfile[] | null;
	error: any;
}> => {
	return await supabase
		.from('user_profile')
		.update({
			userName: updatedData.userName,
			bio: updatedData.bio,
		})
		.eq('user_id', user_id)
		.select();
};

// finding all users from user profile table
export const _fetchAllUsersFromUserProfileTable = async (): Promise<{
	data: UserProfile[] | null;
	error: any;
}> => {
	return await supabase.from('user_profile').select('*');
};

// Update the user_profile record with the avatar URL
export const _updateAvatar = async ({
	avatarUrl,
	userId,
}: {
	avatarUrl: string;
	userId: string | any;
}): Promise<{
	data: UserProfile[] | null;
	error: any;
}> => {
	return await supabase
		.from('user_profile')
		.update({ avtar_url: avatarUrl })
		.eq('user_id', userId)
		.select();
};
