import userSliceReducer from './userSlice';
import {
	fetchUser,
	fetchRegisterUser,
	fetchLogin,
	fetchUpdateUserData,
	fetchLogout,
	initialState,
} from './userSlice';

const userForTest = {
	user: {
		name: 'Roman',
		email: 'rgap87@yandex.ru',
	},
};

// ставим загрулшку jest.fn() для всех функций api-модуля
jest.mock('./../../../utils/burger-api');

describe('тесты userSlice', () => {
	describe('тест функции fetchUser', () => {
		test('тест статуса pending функции fetchUser', () => {
			const expectedState = {
				...initialState,
				isLoading: true,
				success: false,
				error: '',
			};

			const action = { type: fetchUser.pending.type };
			const state = userSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});

		test('тест статуса fulfilled функции fetchUser', () => {
			const expectedState = {
				...initialState,
				user: userForTest.user,
				isLoading: false,
				success: true,
				error: '',
			};

			const action = {
				type: fetchUser.fulfilled.type,
				payload: { ...userForTest, success: true },
			};
			const state = userSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});

		test('тест статуса rejected функции fetchUser', () => {
			const errorMessage = 'Ошибка при загрузке данных';

			const expectedState = {
				...initialState,
				isLoading: false,
				success: false,
				error: errorMessage,
			};

			const action = {
				type: fetchUser.rejected.type,
				error: { message: errorMessage },
			};
			const state = userSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});
	});

	describe('тест функции fetchRegisterUser', () => {
		test('тест статуса pending функции fetchRegisterUser', () => {
			const expectedState = {
				...initialState,
				isLoading: true,
				success: false,
				error: '',
			};

			const action = { type: fetchRegisterUser.pending.type };
			const state = userSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});

		test('тест статуса fulfilled функции fetchRegisterUser', () => {
			const expectedState = {
				...initialState,
				user: userForTest.user,
				isLoading: false,
				success: true,
				error: '',
			};

			const action = {
				type: fetchRegisterUser.fulfilled.type,
				payload: { ...userForTest, success: true },
			};
			const state = userSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});

		test('тест статуса rejected функции fetchRegisterUserUser', () => {
			const errorMessage = 'Ошибка при загрузке данных';

			const expectedState = {
				...initialState,
				isLoading: false,
				success: false,
				error: errorMessage,
			};

			const action = {
				type: fetchRegisterUser.rejected.type,
				error: { message: errorMessage },
			};
			const state = userSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});
	});

	describe('тест функции fetchLogin', () => {
		test('тест статуса pending функции fetchLogin', () => {
			const expectedState = {
				...initialState,
				isLoading: true,
				success: false,
				error: '',
			};

			const action = { type: fetchLogin.pending.type };
			const state = userSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});

		test('тест статуса fulfilled функции fetchLogin', () => {
			const expectedState = {
				...initialState,
				user: userForTest.user,
				isLoading: false,
				success: true,
				error: '',
			};

			const action = {
				type: fetchLogin.fulfilled.type,
				payload: { ...userForTest, success: true },
			};
			const state = userSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});

		test('тест статуса rejected функции fetchLogin', () => {
			const errorMessage = 'Ошибка при загрузке данных';

			const expectedState = {
				...initialState,
				isLoading: false,
				success: false,
				error: errorMessage,
			};

			const action = {
				type: fetchLogin.rejected.type,
				error: { message: errorMessage },
			};
			const state = userSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});
	});

	describe('тест функции fetchUpdateUserData', () => {
		test('тест статуса pending функции fetchUpdateUserData', () => {
			const expectedState = {
				...initialState,
				isLoading: true,
				success: false,
				error: '',
			};

			const action = { type: fetchUpdateUserData.pending.type };
			const state = userSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});

		test('тест статуса fulfilled функции fetchUpdateUserData', () => {
			const expectedState = {
				...initialState,
				user: userForTest.user,
				isLoading: false,
				success: true,
				error: '',
			};

			const action = {
				type: fetchUpdateUserData.fulfilled.type,
				payload: { ...userForTest, success: true },
			};
			const state = userSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});

		test('тест статуса rejected функции fetchUpdateUserData', () => {
			const errorMessage = 'Ошибка при загрузке данных';

			const expectedState = {
				...initialState,
				isLoading: false,
				success: false,
				error: errorMessage,
			};

			const action = {
				type: fetchUpdateUserData.rejected.type,
				error: { message: errorMessage },
			};
			const state = userSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});
	});

	describe('тест функции fetchLogout', () => {
		test('тест статуса pending функции fetchLogout', () => {
			const expectedState = {
				...initialState,
				isLoading: true,
				success: false,
				error: '',
			};

			const action = { type: fetchLogout.pending.type };
			const state = userSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});

		test('тест статуса fulfilled функции fetchLogout', () => {
			const expectedState = {
				...initialState,
				user: initialState.user,
				isLoading: false,
				success: false,
				error: '',
			};

			const action = {
				type: fetchLogout.fulfilled.type,
				payload: userForTest,
			};
			const state = userSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});

		test('тест статуса rejected функции fetchLogout', () => {
			const errorMessage = 'Ошибка при загрузке данных';

			const expectedState = {
				...initialState,
				isLoading: false,
				success: false,
				error: errorMessage,
			};

			const action = {
				type: fetchLogout.rejected.type,
				error: { message: errorMessage },
			};
			const state = userSliceReducer(initialState, action);
			expect(state).toEqual(expectedState);
		});
	});
});
