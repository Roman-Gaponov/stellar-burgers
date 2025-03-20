import React from 'react';
import { useSelector } from '../../services/store';
import {
	isUserAuthSelector,
	isUserDataLoadingSelector,
} from '../../services/slices/userSlice/userSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
	onlyUnAuth?: boolean;
	children: React.ReactElement;
};

export const ProtectedRoute = ({
	onlyUnAuth,
	children,
}: ProtectedRouteProps) => {
	const isAuth = useSelector(isUserAuthSelector);
	const isLoading = useSelector(isUserDataLoadingSelector);
	const location = useLocation();

	if (isLoading) {
		return <Preloader />;
	}

	if (!onlyUnAuth && !isAuth) {
		return <Navigate replace to={'/login'} state={{ from: location }} />;
	}

	if (onlyUnAuth && isAuth) {
		const from = location.state?.from || { pathname: '/' };
		return <Navigate replace to={from} />;
	}

	return children;
};
