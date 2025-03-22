import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
	fetchOrders,
	ordersSelector,
} from '../../services/slices/ordersSlice/ordersSlice';

export const ProfileOrders: FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchOrders());
	}, [dispatch]);

	/** TODO: взять переменную из стора */
	const orders: TOrder[] = useSelector(ordersSelector);

	return <ProfileOrdersUI orders={orders} />;
};
