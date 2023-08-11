import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth-slice';

const rootReducer = combineReducers({
	auth: authReducer,
	// ... other slices
});

const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
