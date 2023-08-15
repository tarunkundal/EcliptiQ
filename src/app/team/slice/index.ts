import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SetTeamActionPayload, TeamState } from '../types';

const initialState: TeamState = { teams: [] };

const teamSlice = createSlice({
	name: 'teamSlice',
	initialState,
	reducers: {
		set_team: (state, action: PayloadAction<SetTeamActionPayload>) => {
			state.teams = action.payload.teams;
		},
	},
});

export default teamSlice.reducer;
export const teamActions = teamSlice.actions;
