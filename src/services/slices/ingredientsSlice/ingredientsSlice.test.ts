import ingredientsSliceReducer from './ingredientsSlice';
import { fetchIngredients, initialState } from './ingredientsSlice';

// ставим загрулшку jest.fn() для всех функций api-модуля
jest.mock('./../../../utils/burger-api');

const ingredientsForTest = [
	{
		_id: '643d69a5c3f7b9001cfa0941',
		name: 'Биокотлета из марсианской Магнолии',
		type: 'main',
		proteins: 420,
		fat: 142,
		carbohydrates: 242,
		calories: 4242,
		price: 424,
		image: 'https://code.s3.yandex.net/react/code/meat-01.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
	},
];

describe('тесты ingredientsSlice', () => {
	test('тест статуса pending функции fetchIngredients', () => {
		const expectedState = {
			...initialState,
			isLoading: true,
			success: false,
			error: '',
		};

		const action = { type: fetchIngredients.pending.type };
		const state = ingredientsSliceReducer(initialState, action);
		expect(state).toEqual(expectedState);
	});

	test('тест статуса fulfilled функции fetchIngredients', () => {
		const expectedState = {
			ingredients: ingredientsForTest,
			isLoading: false,
			success: true,
			error: '',
		};

		const action = {
			type: fetchIngredients.fulfilled.type,
			payload: ingredientsForTest,
		};
		const state = ingredientsSliceReducer(initialState, action);
		expect(state).toEqual(expectedState);
	});

	test('тест статуса rejected функции fetchIngredients', () => {
		const errorMessage = 'Ошибка при загрузке данных';

		const expectedState = {
			...initialState,
			isLoading: false,
			success: false,
			error: errorMessage,
		};

		const action = {
			type: fetchIngredients.rejected.type,
			error: { message: errorMessage },
		};
		const state = ingredientsSliceReducer(initialState, action);
		expect(state).toEqual(expectedState);
	});
});
