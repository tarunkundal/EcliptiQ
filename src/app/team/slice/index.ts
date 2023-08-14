import { createSlice } from '@reduxjs/toolkit';

const teamSlice = createSlice({
	name: 'teamSlice',
	initialState: [],
	reducers: {},
});

export default teamSlice.reducer;
export const teamActions = teamSlice.actions;
