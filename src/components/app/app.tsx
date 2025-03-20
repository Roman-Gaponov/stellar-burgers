import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch } from '../../services/store';

import {
	ConstructorPage,
	Feed,
	ForgotPassword,
	Login,
	NotFound404,
	Profile,
	ProfileOrders,
	Register,
	ResetPassword,
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, OrderInfo, Modal } from '@components';
import { fetchIngredients } from '../../services/slices/ingredientsSlice/ingredientsSlice';
import { fetchFeeds } from '../../services/slices/feedsSlice/feedsSlice';
import { ProtectedRoute } from '../protectedRoute/protected-route';
import {
	fetchUser,
	fetchUserOrders,
} from '../../services/slices/userSlice/userSlice';

const App = () => {
	const location = useLocation();
	const backgroundLocation = location?.state?.background;

	const navigate = useNavigate();

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchIngredients());
		dispatch(fetchFeeds());
		dispatch(fetchUser);
		dispatch(fetchUserOrders);
	});

	return (
		<div className={styles.app}>
			<AppHeader />

			<Routes location={backgroundLocation || location}>
				<Route path='/' element={<ConstructorPage />} />
				<Route path='/feed' element={<Feed />} />

				<Route
					path='/login'
					element={
						<ProtectedRoute onlyUnAuth>
							<Login />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/register'
					element={
						<ProtectedRoute onlyUnAuth>
							<Register />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/forgot-password'
					element={
						<ProtectedRoute onlyUnAuth>
							<ForgotPassword />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/reset-password'
					element={
						<ProtectedRoute onlyUnAuth>
							<ResetPassword />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/profile'
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
        
				<Route
					path='/profile/orders'
					element={
						<ProtectedRoute>
							<ProfileOrders />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/profile/orders/:number'
					element={
						<ProtectedRoute>
							<Modal title='' onClose={() => () => navigate('/profile/orders')}>
								<OrderInfo />
							</Modal>
						</ProtectedRoute>
					}
				/>

				<Route
					path='/feed/:number'
					element={
						<Modal title='Детали заказа' onClose={() => navigate('/feed')}>
							<OrderInfo />
						</Modal>
					}
				/>

				<Route
					path='/ingredients/:id'
					element={
						<Modal
							title='Детали ингредиента'
							onClose={() => () => navigate('/')}>
							<IngredientDetails />
						</Modal>
					}
				/>

				<Route path='*' element={<NotFound404 />} />
			</Routes>

			{backgroundLocation && (
				<Routes>
					<Route
						path='/profile/orders/:number'
						element={
							<ProtectedRoute>
								<Modal
									title=''
									onClose={() => () => navigate('/profile/orders')}>
									<OrderInfo />
								</Modal>
							</ProtectedRoute>
						}
					/>

					<Route
						path='/feed/:number'
						element={
							<Modal title='Детали заказа' onClose={() => navigate('/feed')}>
								<OrderInfo />
							</Modal>
						}
					/>

					<Route
						path='/ingredients/:id'
						element={
							<Modal
								title='Детали ингредиента'
								onClose={() => () => navigate('/')}>
								<IngredientDetails />
							</Modal>
						}
					/>
				</Routes>
			)}
		</div>
	);
};

export default App;
