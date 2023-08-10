import React, { ReactNode } from 'react';
import { Redirect } from 'react-router-dom';

import { useAuthStore } from '../../store/auth/AuthContextProvider';
import Routes from '..';

interface MyComponentProps {
	children: ReactNode;
}
const ProtectedRoutes: React.FC<MyComponentProps> = ({ children }) => {
	const { user } = useAuthStore();

	if (user === null) {
		return <Redirect to={Routes.LOGIN} />;
	}

	return <>{children}</>;
};

export default ProtectedRoutes;
