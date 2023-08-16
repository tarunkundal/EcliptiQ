import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
	AddTeamActionPayload,
	DeleteTeamActionPayload,
	SetTeamActionPayload,
	TeamState,
	UpdateTeamActionPayload,
} from '../types';

const initialState: TeamState = { teams: [] };

const teamSlice = createSlice({
	name: 'teamSlice',
	initialState,
	reducers: {
		set_team: (state, action: PayloadAction<SetTeamActionPayload>) => {
			state.teams = action.payload.teams;
		},

		update_team: (state, action: PayloadAction<UpdateTeamActionPayload>) => {
			return {
				...state,
				teams: state.teams.map((team) =>
					team.id === action.payload.teamId
						? { ...team, name: action.payload.teamName }
						: team
				),
			};
		},
		delete_team: (state, action: PayloadAction<DeleteTeamActionPayload>) => {
			return {
				teams: state.teams.filter((team) => team.id !== action.payload.teamId),
			};
		},
		add_team: (state, action: PayloadAction<AddTeamActionPayload>) => {
			return {
				...state,
				teams: [...state.teams, action.payload.team],
			};
		},
	},
});

export default teamSlice.reducer;
export const teamActions = teamSlice.actions;
