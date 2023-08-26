import {
	createSlice,
	PayloadAction,
	Slice,
	SliceCaseReducers,
} from '@reduxjs/toolkit';

import {
	AddTeamActionPayload,
	DeleteTeamActionPayload,
	SetTeamActionPayload,
	TeamState,
	UpdateTeamActionPayload,
} from '../types';

const initialState: TeamState = { teams: [], selectedTeamId: null };

// Define the case reducers type
interface TeamSliceCaseReducers extends SliceCaseReducers<TeamState> {
	set_team: (
		state: TeamState,
		action: PayloadAction<SetTeamActionPayload>
	) => void;
	set_selected_team: (state: TeamState, action: PayloadAction<string>) => void;
	update_team: (
		state: TeamState,
		action: PayloadAction<UpdateTeamActionPayload>
	) => void;
	delete_team: (
		state: TeamState,
		action: PayloadAction<DeleteTeamActionPayload>
	) => void;
	add_team: (
		state: TeamState,
		action: PayloadAction<AddTeamActionPayload>
	) => void;
}

const teamSlice: Slice<TeamState, TeamSliceCaseReducers, 'teamSlice'> =
	createSlice({
		name: 'teamSlice',
		initialState,
		reducers: {
			set_team: (state, action: PayloadAction<SetTeamActionPayload>) => {
				state.teams = action.payload.teams;
			},
			set_selected_team: (state, action: PayloadAction<string>) => {
				state.selectedTeamId = action.payload;
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
				state.teams = state.teams.filter(
					(team) => team.id !== action.payload.teamId
				);
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
