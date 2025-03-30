import feedSliceReducer from './feedSlice';
import { fetchFeed, initialState } from './feedSlice';

const feedForTest = {
	orders: [
		{
			_id: '67e8f725ea327c001cf30fff',
			ingredients: [
				'643d69a5c3f7b9001cfa093d',
				'643d69a5c3f7b9001cfa0941',
				'643d69a5c3f7b9001cfa093d',
			],
			status: 'done',
			name: 'Флюоресцентный био-марсианский бургер',
			createdAt: '2025-03-30T07:47:49.995Z',
			updatedAt: '2025-03-30T07:47:50.753Z',
			number: 72800,
		},
	],
	total: 72471,
	totalToday: 278,
};

// ставим загрулшку jest.fn() для всех функций api-модуля
jest.mock('./../../../utils/burger-api');

describe('тесты feedSlice', () => {
	test('тест статуса pending функции fetchFeed', () => {
		const expectedState = {
			...initialState,
			isLoading: true,
			success: false,
			error: '',
		};

		const action = { type: fetchFeed.pending.type };
		const state = feedSliceReducer(initialState, action);
		expect(state).toEqual(expectedState);
	});

	test('тест статуса fulfilled функции fetchFeed', () => {
		const expectedState = {
			feed: feedForTest,
			isLoading: false,
			success: true,
			error: '',
		};

		const action = { type: fetchFeed.fulfilled.type, payload: feedForTest };
		const state = feedSliceReducer(initialState, action);
		expect(state).toEqual(expectedState);
	});

	test('тест статуса rejected функции fetchFeed', () => {
		const errorMessage = 'Ошибка при загрузке данных';

		const expectedState = {
			...initialState,
			isLoading: false,
			success: false,
			error: errorMessage,
		};

		const action = {
			type: fetchFeed.rejected.type,
			error: { message: errorMessage },
		};
		const state = feedSliceReducer(initialState, action);
		expect(state).toEqual(expectedState);
	});
});
