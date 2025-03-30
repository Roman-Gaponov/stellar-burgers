import ordersSliceReducer from './ordersSlice';
import {
	fetchOrders,
	fetchOrderBurger,
	fetchOrderByNumber,
	initialState,
} from './ordersSlice';

const orderForTest = {
	order: {
		_id: '67de92956fce7d001db5b7f4',
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa093e',
			'643d69a5c3f7b9001cfa0941',
		],
		status: 'done',
		name: 'Краторный био-марсианский люминесцентный бургер',
		createdAt: '2025-03-22T10:36:05.331Z',
		updatedAt: '2025-03-22T10:36:06.075Z',
		number: 71814,
	},
};

const ordersForTest = [orderForTest.order];

// ставим загрулшку jest.fn() для всех функций api-модуля
jest.mock('./../../../utils/burger-api');

describe('тесты ordersSlice', () => {
	describe('тест функции fetchOrders', () => {
		test('тест статуса pending функции fetchOrders', () => {
			const expectedState = {
				...initialState,
				isLoading: true,
				success: false,
				error: '',
			};

			const action = { type: fetchOrders.pending.type };
			const state = ordersSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});

		test('тест статуса fulfilled функции fetchOrders', () => {
			const expectedState = {
				...initialState,
				orders: ordersForTest,
				isLoading: false,
				success: true,
				error: '',
			};

			const action = {
				type: fetchOrders.fulfilled.type,
				payload: ordersForTest,
			};
			const state = ordersSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});

		test('тест статуса rejected функции fetchOrders', () => {
			const errorMessage = 'Ошибка при загрузке данных';

			const expectedState = {
				...initialState,
				isLoading: false,
				success: false,
				error: errorMessage,
			};

			const action = {
				type: fetchOrders.rejected.type,
				error: { message: errorMessage },
			};
			const state = ordersSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});
	});

	describe('тест функции fetchOrderBurger', () => {
		test('тест статуса pending функции fetchOrderBurger', () => {
			const expectedState = {
				...initialState,
				isLoading: true,
				success: false,
				orderRequestStatus: true,
				error: '',
			};

			const action = { type: fetchOrderBurger.pending.type };
			const state = ordersSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});

		test('тест статуса fulfilled функции fetchOrderBurger', () => {
			const expectedState = {
				...initialState,
				orders: [...initialState.orders, orderForTest.order],
				lastOrder: orderForTest.order,
				isLoading: false,
				success: true,
				orderRequestStatus: false,
				error: '',
			};

			const action = {
				type: fetchOrderBurger.fulfilled.type,
				payload: orderForTest,
			};
			const state = ordersSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});

		test('тест статуса rejected функции fetchOrderBurger', () => {
			const errorMessage = 'Ошибка при загрузке данных';

			const expectedState = {
				...initialState,
				isLoading: false,
				success: false,
				orderRequestStatus: false,
				error: errorMessage,
			};

			const action = {
				type: fetchOrderBurger.rejected.type,
				error: { message: errorMessage },
			};
			const state = ordersSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});
	});

	describe('тест функции fetchOrderByNumber', () => {
		test('тест статуса pending функции fetchOrderByNumber', () => {
			const expectedState = {
				...initialState,
				isLoading: true,
				success: false,
				error: '',
			};

			const action = { type: fetchOrderByNumber.pending.type };
			const state = ordersSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});

		test('тест статуса fulfilled функции fetchOrderByNumber', () => {
			const expectedState = {
				...initialState,
				orderByNumber: ordersForTest,
				isLoading: false,
				success: true,
				error: '',
			};

			const action = {
				type: fetchOrderByNumber.fulfilled.type,
				payload: ordersForTest,
			};
			const state = ordersSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});

		test('тест статуса rejected функции fetchOrderByNumber', () => {
			const errorMessage = 'Ошибка при загрузке данных';

			const expectedState = {
				...initialState,
				isLoading: false,
				success: false,
				error: errorMessage,
			};

			const action = {
				type: fetchOrderByNumber.rejected.type,
				error: { message: errorMessage },
			};
			const state = ordersSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});
	});
});
