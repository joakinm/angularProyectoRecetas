import { Ingredientes } from "src/app/shared/ingredients.model";
import * as shoppingListActions from './shopping-list.action';

export interface State {
    ingredients: Array<Ingredientes>;
    editedIngredient: Ingredientes;
    editedIngredientIndex: number;
}

export interface AppState {
    shoppingList: State;
}

const initialState: State = {
    ingredients: [new Ingredientes('manzanas', 5), new Ingredientes('papa', 2), new Ingredientes('pera', 1)],
    editedIngredient: null,
    editedIngredientIndex: -1

};

export function shoppingListReducer (
    state: State = initialState,
    action: shoppingListActions.shoppingListType
) {
    switch (action.type) {
        case shoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredientes: [...state.ingredients, action.payload]
            }

        case shoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredientes: [...state.ingredients, ...action.payload]
            }

        case shoppingListActions.UPDATE_INGREDIENTS:
            const ingredient = state.ingredients[action.payload.index];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingrediente
            };

            const updatedIngredients = [...state.ingredients];
            updatedIngredients[action.payload.index] = updatedIngredient;
            return {
                ...state,
                ingredientes: updatedIngredients
            }

        case shoppingListActions.DELETE_INGREDIENTS:
            return {
                ...state,
                ingredientes: state.ingredients.filter((ing, ingIndex) => {
                    return ingIndex !== action.payload;
                })
            }
        default:
            return state;
    }
}