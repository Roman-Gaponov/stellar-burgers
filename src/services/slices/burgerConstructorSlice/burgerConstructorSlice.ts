import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface BurgerConstructorState {
	constructorBun: TConstructorIngredient | null;
	constructorIngredients: TConstructorIngredient[];
}

const initialState: BurgerConstructorState = {
	constructorBun: null,
	constructorIngredients: [],
};

const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		addIngredient: {
			prepare: (item: TIngredient) => {
				const id = nanoid();
				return { payload: { id, ...item } };
			},
			reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
				if (action.payload.type === 'bun') {
					state.constructorBun = action.payload;
				} else {
					state.constructorIngredients.push(action.payload);
				}
			},
		},
		removeIngredient: (state, action: PayloadAction<string>) => {
			state.constructorIngredients = state.constructorIngredients.filter(
				(item) => item.id !== action.payload
			);
		},
		resetConstructor: (state) => {
			state.constructorBun = null;
			state.constructorIngredients = [];
		},
		moveUpIngredient: (state, action: PayloadAction<string>) => {
			const index = state.constructorIngredients.findIndex((item) => {
				item.id === action.payload;
			});
			const [item] = state.constructorIngredients.splice(index, 1);
			state.constructorIngredients.splice(index - 1, 0, item);
		},
		moveDownIngredient: (state, action: PayloadAction<string>) => {
			const index = state.constructorIngredients.findIndex((item) => {
				item.id === action.payload;
			});
			const [item] = state.constructorIngredients.splice(index, 1);
			state.constructorIngredients.splice(index + 1, 0, item);
		},
	},
	selectors: {
		constructorBunSelector: (state) => state.constructorBun,
		costructorIngredientsSelector: (state) => state.constructorIngredients,
	},
});

export const {
	addIngredient,
	removeIngredient,
	resetConstructor,
	moveUpIngredient,
	moveDownIngredient,
} = burgerConstructorSlice.actions;

export const { constructorBunSelector, costructorIngredientsSelector } =
	burgerConstructorSlice.selectors;

export default burgerConstructorSlice.reducer;
