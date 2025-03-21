import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
	fetchUserOrders,
	userOrdersSelector,
} from '../../services/slices/userSlice/userSlice';

export const ProfileOrders: FC = () => {
	/** TODO: взять переменную из стора */
	const orders: TOrder[] = useSelector(userOrdersSelector);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUserOrders());
	});

	return <ProfileOrdersUI orders={orders} />;
};
