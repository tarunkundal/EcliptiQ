import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
	AddInvitationActionPayload,
	InvitationState,
	SetInvitationActionPayload,
	UpdateInvitationStatusActionPayload,
} from '../types';

const initialState: InvitationState = { invitations: [] };

const invitationSlice = createSlice({
	name: 'invitationSlice',
	initialState,
	reducers: {
		set_invitations: (
			state,
			action: PayloadAction<SetInvitationActionPayload>
		) => {
			state.invitations = action.payload.invitations;
		},
		update_invitation: (
			state,
			action: PayloadAction<UpdateInvitationStatusActionPayload>
		) => {
			const { status, invitationId } = action.payload;

			return {
				...state,
				invitations: state.invitations.map((invitation) =>
					invitation.id === invitationId
						? { ...invitation, status: status }
						: invitation
				),
			};
		},
		add_invitation: (
			state,
			action: PayloadAction<AddInvitationActionPayload>
		) => {
			return {
				...state,
				invitations: [...state.invitations, action.payload.invitation],
			};
		},
	},
});

export default invitationSlice.reducer;
export const invitationActions = invitationSlice.actions;
