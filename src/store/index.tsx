import { combineReducers, configureStore } from '@reduxjs/toolkit';

import teamReducer from './teams/team-slice';
// eslint-disable-next-line import/no-named-as-default
import userReducer from './user/user-slice';

const rootReducer = combineReducers({
	user: userReducer,
	team: teamReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
