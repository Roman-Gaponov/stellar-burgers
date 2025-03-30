import { expect, test } from '@jest/globals';
import { combineReducers } from 'redux';
import ingredientsSliceReducer from '../slices/ingredientsSlice/ingredientsSlice';
import feedSliceReducer from '../slices/feedSlice/feedSlice';
import burgerConstructorSliceReducer from '../slices/burgerConstructorSlice/burgerConstructorSlice';
import userSliceReducer from '../slices/userSlice/userSlice';
import ordersSliceReducer from '../slices/ordersSlice/ordersSlice';

const TestActionTypes = {
	INIT: '@@redux/INIT',
};

describe('тесты для rootReducer', () => {
	test('Проверка корректной инициализации rootReducer', () => {
		const rootReducer = combineReducers({
			ingredients: ingredientsSliceReducer,
			feed: feedSliceReducer,
			burgerConstructor: burgerConstructorSliceReducer,
			user: userSliceReducer,
			orders: ordersSliceReducer,
		});

		const initialState = rootReducer(undefined, { type: TestActionTypes.INIT });

		expect(initialState).toEqual({
			ingredients: ingredientsSliceReducer(undefined, {
				type: TestActionTypes.INIT,
			}),
			feed: feedSliceReducer(undefined, { type: TestActionTypes.INIT }),
			burgerConstructor: burgerConstructorSliceReducer(undefined, {
				type: TestActionTypes.INIT,
			}),
			user: userSliceReducer(undefined, { type: TestActionTypes.INIT }),
			orders: ordersSliceReducer(undefined, { type: TestActionTypes.INIT }),
		});
	});
});
