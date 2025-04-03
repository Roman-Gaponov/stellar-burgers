import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store/store';
import { useParams } from 'react-router-dom';

import {
	fetchOrderByNumber,
	isSuccessOrderByNumberSelector,
	orderByNumberSelector,
} from '../../services/slices/ordersSlice/ordersSlice';

import { ingredientsDataSelector } from '../../services/slices/ingredientsSlice/ingredientsSlice';

export const OrderInfo: FC = () => {
	/** TODO: взять переменные orderData и ingredients из стора */
	const orderData = useSelector(orderByNumberSelector);

	const ingredients: TIngredient[] = useSelector(ingredientsDataSelector);

	const isSuccessOrderByNumber = useSelector(isSuccessOrderByNumberSelector);

	const dispatch = useDispatch();

	const params = useParams();
	const number = Number(params.number);

	useEffect(() => {
		dispatch(fetchOrderByNumber(number));
	}, [dispatch, number]);

	/* Готовим данные для отображения */
	const orderInfo = useMemo(() => {
		if (!orderData || !ingredients.length) return null;

		const date = new Date(orderData.createdAt);

		type TIngredientsWithCount = {
			[key: string]: TIngredient & { count: number };
		};

		const ingredientsInfo = orderData.ingredients.reduce(
			(acc: TIngredientsWithCount, item) => {
				if (!acc[item]) {
					const ingredient = ingredients.find((ing) => ing._id === item);
					if (ingredient) {
						acc[item] = {
							...ingredient,
							count: 1,
						};
					}
				} else {
					acc[item].count++;
				}

				return acc;
			},
			{}
		);

		const total = Object.values(ingredientsInfo).reduce(
			(acc, item) => acc + item.price * item.count,
			0
		);

		return {
			...orderData,
			ingredientsInfo,
			date,
			total,
		};
	}, [orderData, ingredients]);

	if (!orderInfo || !isSuccessOrderByNumber) {
		return <Preloader />;
	}

	return <OrderInfoUI orderInfo={orderInfo} />;
};
