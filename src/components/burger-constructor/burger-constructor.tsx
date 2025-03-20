import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';

import {
	constructorBunSelector,
	costructorIngredientsSelector,
	resetConstructor,
} from '../../services/slices/burgerConstructorSlice/burgerConstructorSlice';

import {
	fetchOrderBurger,
	lastOrderSelector,
	orderRequestStatusSelector,
	setLastOrder,
	userAuthStatusSelector,
} from '../../services/slices/userSlice/userSlice';
import { useNavigate } from 'react-router-dom';
import { fetchFeeds } from '../../services/slices/feedsSlice/feedsSlice';

export const BurgerConstructor: FC = () => {
	/** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
	const constructorBun = useSelector(constructorBunSelector);
	const constructorIngredients = useSelector(costructorIngredientsSelector);

	const constructorItems = {
		bun: constructorBun,
		ingredients: constructorIngredients,
	};

	const isAuth = useSelector(userAuthStatusSelector);

	const orderRequest = useSelector(orderRequestStatusSelector);

	const orderModalData = useSelector(lastOrderSelector);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onOrderClick = () => {
		if (!isAuth) {
			return navigate('/login');
		}

		if (!constructorItems.bun || orderRequest) return;

		const ingredientsId: string[] = [
			constructorItems.bun._id,
			...constructorItems.ingredients.map((item) => item._id),
		];

		dispatch(fetchOrderBurger(ingredientsId));
		dispatch(resetConstructor());
		dispatch(fetchFeeds());
	};

	const closeOrderModal = () => {
		dispatch(setLastOrder(null));
	};

	const price = useMemo(
		() =>
			(constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
			constructorItems.ingredients.reduce(
				(s: number, v: TConstructorIngredient) => s + v.price,
				0
			),
		[constructorItems]
	);

	return (
		<BurgerConstructorUI
			price={price}
			orderRequest={orderRequest}
			constructorItems={constructorItems}
			orderModalData={orderModalData}
			onOrderClick={onOrderClick}
			closeOrderModal={closeOrderModal}
		/>
	);
};
