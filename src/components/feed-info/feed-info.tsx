import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import {
	ordersDataSelector,
	totalOrdersSelector,
	totalTodayOrdersSelector,
} from '../../services/slices/feedsSlice/feedsSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
	orders
		.filter((item) => item.status === status)
		.map((item) => item.number)
		.slice(0, 20);

export const FeedInfo: FC = () => {
	/** TODO: взять переменные из стора */
	const orders: TOrder[] = useSelector(ordersDataSelector);
	const feed = {
		total: useSelector(totalOrdersSelector),
		totalToday: useSelector(totalTodayOrdersSelector),
	};

	const readyOrders = getOrders(orders, 'done');

	const pendingOrders = getOrders(orders, 'pending');

	return (
		<FeedInfoUI
			readyOrders={readyOrders}
			pendingOrders={pendingOrders}
			feed={feed}
		/>
	);
};
