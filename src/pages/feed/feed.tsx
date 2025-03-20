import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds, ordersDataSelector } from '../../services/slices/feedsSlice/feedsSlice';

export const Feed: FC = () => {
	/** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(ordersDataSelector);

  const dispatch = useDispatch();

	if (!orders.length) {
		return <Preloader />;
	}

	<FeedUI orders={orders} handleGetFeeds={() => {dispatch(fetchFeeds())}} />;
};
