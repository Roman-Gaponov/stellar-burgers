import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
	fetchFeeds,
	ordersDataSelector,
} from '../../services/slices/feedsSlice/feedsSlice';

export const Feed: FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchFeeds());
	});

	/** TODO: взять переменную из стора */
	const orders: TOrder[] = useSelector(ordersDataSelector);

	if (!orders.length) {
		return <Preloader />;
	}

	return (
		<FeedUI
			orders={orders}
			handleGetFeeds={() => {
				dispatch(fetchFeeds());
			}}
		/>
	);
};
