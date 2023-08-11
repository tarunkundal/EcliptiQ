import React, { ReactNode } from 'react';
import { Redirect } from 'react-router-dom';

import Routes from '..';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface MyComponentProps {
	children: ReactNode;
}
const ProtectedRoutes: React.FC<MyComponentProps> = ({ children }) => {
	const user = useSelector((state: RootState) => state.auth.user);

	if (user === null) {
		return <Redirect to={Routes.LOGIN} />;
	}

	return <>{children}</>;
};

export default ProtectedRoutes;
