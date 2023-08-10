import { createContext } from 'react';

const authContext = createContext({
	user: {} || undefined,
	set_user: (userData: any) => {
		userData;
	},
	update_user: (updatedUserData: any) => {
		updatedUserData;
	},
});

export default authContext;
