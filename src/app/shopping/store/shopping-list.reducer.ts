import { Ingredientes } from "src/app/shared/ingredients.model";
import * as shoppingListActions from './shopping-list.action';

export interface State {
    ingredients: Array<Ingredientes>;
    editedIngredient: Ingredientes;
    editedIngredientIndex: number;
}


const initialState: State = {
    ingredients: [new Ingredientes('manzanas', 5), new Ingredientes('papa', 2), new Ingredientes('pera', 1)],
    editedIngredient: null,
    editedIngredientIndex: -1

};

export function ShoppingListReducer (
    state: State = initialState,
    action: shoppingListActions.shoppingListType
) {
    switch (action.type) {
        case shoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }

        case shoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }

        case shoppingListActions.UPDATE_INGREDIENTS:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            };

            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            }

        case shoppingListActions.DELETE_INGREDIENTS:
            return {
                ...state,
                ingredients: state.ingredients.filter((ing, ingIndex) => {
                    return ingIndex !== state.editedIngredientIndex;
                }),
                editedIngredient: null,
                editedIngredientIndex: -1
            }

        case shoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: {...state.ingredients[action.payload]}
              }

        case shoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
            
        default:
            return state;
    }
}