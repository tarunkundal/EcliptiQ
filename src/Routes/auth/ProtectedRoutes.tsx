import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { RootState } from '../../store';
import Routes from '..';

interface MyComponentProps {
	children: ReactNode;
}
const ProtectedRoutes: React.FC<MyComponentProps> = ({ children }) => {
	const user = useSelector((state: RootState) => state.user.user);

	if (user === null) {
		return <Redirect to={Routes.LOGIN} />;
	}

	return <>{children}</>;
};

export default ProtectedRoutes;
