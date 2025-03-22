import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
	fetchFeed,
	feedOrdersSelector,
} from '../../services/slices/feedSlice/feedSlice';

export const Feed: FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchFeed());
	}, [dispatch]);

	/** TODO: взять переменную из стора */
	const orders: TOrder[] = useSelector(feedOrdersSelector);

	if (!orders.length) {
		return <Preloader />;
	}

	return (
		<FeedUI
			orders={orders}
			handleGetFeeds={() => {
				dispatch(fetchFeed());
			}}
		/>
	);
};
