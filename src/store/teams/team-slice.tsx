import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { addTeam, fetchTeams } from './team-action';

interface TeamState {
	teams: any[];
}

const initialState: TeamState = {
	teams: [],
};

const teamSlice = createSlice({
	name: 'team',
	initialState,
	reducers: {
		set_team: (state, action: PayloadAction<any[]>) => {
			state.teams = action.payload;
		},
		add_Team: (state, action: PayloadAction<any>) => {
			state.teams.push(action.payload);
		},
	},
	extraReducers(builder) {
		builder.addCase(addTeam.fulfilled, (state, action) => {
			state.teams.push(action.payload);
		});
		builder.addCase(addTeam.rejected, (state, action) => {
			console.log(action.payload);
		});
		builder.addCase(fetchTeams.fulfilled, (state, action) => {
			console.log(action.payload);
		});
		builder.addCase(fetchTeams.rejected, (state, action) => {
			console.log(action.payload);
		});
	},
});

export const teamActions = teamSlice.actions;
export default teamSlice.reducer;
