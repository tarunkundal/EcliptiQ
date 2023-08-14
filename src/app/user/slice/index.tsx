import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
	SetUserActionPayload,
	UpdateUsernameActionPayload,
	UserState,
} from '../types';

const initialState: UserState = {
	user: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<SetUserActionPayload>) => {
			state.user = action.payload.user;
		},
		updateUsername: (
			state,
			action: PayloadAction<UpdateUsernameActionPayload>
		) => {
			if (state.user) {
				state.user.username = action.payload.username;
			}
		},
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
