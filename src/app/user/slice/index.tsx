import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SetUserActionPayload, UserState } from '../types';

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
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
