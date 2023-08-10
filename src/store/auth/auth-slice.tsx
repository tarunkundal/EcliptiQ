import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
	user: object | null;
}

const initialState: AuthState = {
	user: null,
};

const authSlice = createSlice({
	name: 'auth-slice',
	initialState,
	reducers: {
		set_user: (state, action) => {
			state.user = action.payload;
		},
		clear_user: (state) => {
			state.user = null;
		},
	},
});

export const { set_user, clear_user } = authSlice.actions;
export default authSlice.reducer;
