import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
	SetUserProfileActionPayload,
	UpdateUserProfileActionPayload,
	UserProfileState,
} from '../types';

const initialState: UserProfileState = {
	userProfile: null,
};

const userProfileSlice = createSlice({
	name: 'userProfile',
	initialState,
	reducers: {
		setUserProfile: (
			state,
			action: PayloadAction<SetUserProfileActionPayload>
		) => {
			state.userProfile = action.payload.userProfile;
		},
		updateUserProfile: (
			state,
			action: PayloadAction<UpdateUserProfileActionPayload>
		) => {
			return {
				...state,
				...action.payload.updatedData,
			};
		},
	},
});

export const userProfileActions = userProfileSlice.actions;
export default userProfileSlice.reducer;
