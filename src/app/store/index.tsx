import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import invitationReducer from '../invitation/slice/index';
import memberReducer from '../members/slice/index';
import teamReducer from '../team/slice/index';
import userReducer from '../user/slice/index';

const rootReducer = combineReducers({
	user: userReducer,
	teams: teamReducer,
	members: memberReducer,
	invitations: invitationReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
