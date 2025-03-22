import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { TIngredient } from '@utils-types';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store/store';
import { ingredientsDataSelector } from '../../services/slices/ingredientsSlice/ingredientsSlice';

export const IngredientDetails: FC = () => {
	const location = useLocation();
	const ingredientIndex = location.pathname.replace('/ingredients/', '');

	const ingredientsData = useSelector(ingredientsDataSelector);

	/** TODO: взять переменную из стора */
	const ingredientData: TIngredient = ingredientsData.find(
		(ingredient) => ingredient._id === ingredientIndex
	)!;

	if (!ingredientData) {
		return <Preloader />;
	}

	return <IngredientDetailsUI ingredientData={ingredientData} />;
};
