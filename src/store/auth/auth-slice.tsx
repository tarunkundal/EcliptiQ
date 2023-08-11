import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
	user: object | null;
	loading: boolean;
	error: any;
}

const initialState: AuthState = {
	user: null,
	loading: false,
	error: '',
};

const authSlice = createSlice({
	name: 'auth',
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

export const authActions = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
