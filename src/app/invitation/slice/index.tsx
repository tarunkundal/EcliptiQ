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

			// Find the index of the invitation in the array
			const invitationIndex = state.invitations.findIndex(
				(invitation) => invitation.id === invitationId
			);

			if (invitationIndex !== -1) {
				// Update the status of the invitation
				state.invitations[invitationIndex].status = status;
			}
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
