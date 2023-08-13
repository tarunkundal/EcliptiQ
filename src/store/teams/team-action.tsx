import { createAsyncThunk } from '@reduxjs/toolkit';

import supabase from '../../lib/api';

export const fetchTeams = createAsyncThunk('team/fetchTeams', async () => {
	const { data, error } = await supabase.from('teams').select('*');
	if (error) throw error;
	return data;
});

export const addTeam = createAsyncThunk(
	'team/addTeam',
	async ({
		creater_id,
		teamName,
	}: {
		creater_id: string;
		teamName: string;
	}) => {
		const { data, error } = await supabase.from('teams').insert([
			{
				creater_id: creater_id,
				team_name: teamName,
			},
		]);
		if (!data) console.log('created');

		if (error) return error.message;
	}
);
