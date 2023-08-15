import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MemberState, SetMemberActionPayload } from '../types';

const initialState: MemberState = { members: [] };

const memberSlice = createSlice({
	name: 'members',
	initialState,
	reducers: {
		set_member: (state, action: PayloadAction<SetMemberActionPayload>) => {
			state.members = action.payload.members;
		},
	},
});

export default memberSlice.reducer;
export const memberActions = memberSlice.actions;
