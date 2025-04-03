import { TIngredient } from '@utils-types';
import {
	addIngredient,
	BurgerConstructorState,
	initialState,
	removeIngredient,
	reorderConstructor,
} from './burgerConstructorSlice';
import burgerConstructorSliceReducer from './burgerConstructorSlice';

const ingredientsForTest: TIngredient[] = [
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

	{
		_id: '643d69a5c3f7b9001cfa0942',
		name: 'Соус Spicy-X',
		type: 'sauce',
		proteins: 30,
		fat: 20,
		carbohydrates: 40,
		calories: 30,
		price: 90,
		image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
	},

	{
		_id: '643d69a5c3f7b9001cfa093e',
		name: 'Филе Люминесцентного тетраодонтимформа',
		type: 'main',
		proteins: 44,
		fat: 26,
		carbohydrates: 85,
		calories: 643,
		price: 988,
		image: 'https://code.s3.yandex.net/react/code/meat-03.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
	},
];

const bunForTest: TIngredient = {
	_id: '643d69a5c3f7b9001cfa093c',
	name: 'Краторная булка N-200i',
	type: 'bun',
	proteins: 80,
	fat: 24,
	carbohydrates: 53,
	calories: 420,
	price: 1255,
	image: 'https://code.s3.yandex.net/react/code/bun-02.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
};

describe('тесты BurgerConstructorSlice', () => {
	let testState: BurgerConstructorState;

	beforeEach(() => {
		testState = initialState;
	});

	test('тест на добавление булок', () => {
		const action = addIngredient(bunForTest);
		testState = burgerConstructorSliceReducer(testState, action);

		expect(testState.constructorBun).toMatchObject({
			...bunForTest,
			id: expect.any(String),
		});
	});

	test('тест на добавление ингредиентов', () => {
		const action = addIngredient(ingredientsForTest[0]);
		testState = burgerConstructorSliceReducer(testState, action);

		expect(testState.constructorIngredients[0]).toMatchObject({
			...ingredientsForTest[0],
			id: expect.any(String),
		});
	});

	test('тест на удаление ингредиента', () => {
		const prepareAction = addIngredient(ingredientsForTest[0]);
		testState = burgerConstructorSliceReducer(testState, prepareAction);

		const action = removeIngredient(testState.constructorIngredients[0].id);
		testState = burgerConstructorSliceReducer(testState, action);

		expect(testState.constructorIngredients).toEqual([]);
	});

	describe('тесты на перемещение ингрендиентов', () => {
		beforeEach(() => {
			ingredientsForTest.forEach((ingredient) => {
				testState = burgerConstructorSliceReducer(
					testState,
					addIngredient(ingredient)
				);
			});
		});

		test('тест на перемещение ингредиента вверх', () => {
			const action = reorderConstructor({ from: 1, to: 0 });
			testState = burgerConstructorSliceReducer(testState, action);

			expect(testState.constructorIngredients[0]._id).toEqual(
				ingredientsForTest[1]._id
			);
			expect(testState.constructorIngredients[1]._id).toEqual(
				ingredientsForTest[0]._id
			);
		});

		test('тест на перемещение ингредиента вниз', () => {
			const action = reorderConstructor({ from: 1, to: 2 });
			testState = burgerConstructorSliceReducer(testState, action);

			expect(testState.constructorIngredients[1]._id).toEqual(
				ingredientsForTest[2]._id
			);
			expect(testState.constructorIngredients[2]._id).toEqual(
				ingredientsForTest[1]._id
			);
		});
	});
});
