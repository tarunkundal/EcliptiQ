import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
	AddMemberActionPayload,
	DeleteMemberActionPayload,
	MemberState,
	SetMemberActionPayload,
	UpdateMemberActionPayload,
} from '../types';

const initialState: MemberState = { members: [] };

const memberSlice = createSlice({
	name: 'members',
	initialState,
	reducers: {
		set_member: (state, action: PayloadAction<SetMemberActionPayload>) => {
			state.members = action.payload.members;
		},

		add_member: (state, action: PayloadAction<AddMemberActionPayload>) => {
			return {
				...state,
				members: [...state.members, action.payload.member],
			};
		},

		delete_member: (
			state,
			action: PayloadAction<DeleteMemberActionPayload>
		) => {
			return {
				members: state.members.filter(
					(member) => member.id !== action.payload.memberId
				),
			};
		},

		update_member: (
			state,
			action: PayloadAction<UpdateMemberActionPayload>
		) => {
			return {
				...state,
				members: state.members.map((member) =>
					member.id === action.payload.memberId
						? { ...member, role: action.payload.role }
						: member
				),
			};
		},
	},
});

export default memberSlice.reducer;
export const memberActions = memberSlice.actions;
