import React, { ReactNode, useContext, useReducer } from 'react';

import authContext from './authContext';

interface MyContextProps {
	children: ReactNode;
}

const initialState: object = { user: null };

const reducerFun = (
	state: any,
	action: { type: string; userData: any; updatedUserData: any },
) => {
	if (action.type === 'SET_USER')
		return {
			...state,
			user: action.userData,
		};

	if (action.type === 'UPDATE_USER') {
		return {
			...state,
			user: action.updatedUserData,
		};
	}

	return initialState;
};

const AuthContexProvider: React.FC<MyContextProps> = ({ children }) => {
	const [user, dispatchUser] = useReducer(reducerFun, initialState);

	const setUserDataHandler = (userData: any) => {
		dispatchUser({
			type: 'SET_USER',
			userData,
			updatedUserData: undefined,
		});
	};

	const updateUserDataHandler = (updatedUserData: any) => {
		dispatchUser({
			type: 'UPDATE_USER',
			updatedUserData,
			userData: undefined,
		});
	};

	const contextValue = {
		user: user.user,
		set_user: setUserDataHandler,
		update_user: updateUserDataHandler,
	};

	return (
		<authContext.Provider value={contextValue}>{children}</authContext.Provider>
	);
};

export default AuthContexProvider;

// making custom hook to use the authContext
export const useAuthStore = () => {
	const context = useContext(authContext);
	if (context === undefined) {
		throw new Error('useStore must be used within a AuthContextProvider');
	}
	return context;
};
