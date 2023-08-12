import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		clearUser: (state) => {
			state.user = null;
		},
	},
	extraReducers(builder) {
		builder.addCase;
	},
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
export default userReducer;
