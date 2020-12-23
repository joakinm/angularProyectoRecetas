import { Ingredientes } from "src/app/shared/ingredients.model";
import * as shoppingListAction from './shopping-list.action';

const initialState = {ingredientes :
    [new Ingredientes('manzanas',5),
    new Ingredientes('papa',2), 
    new Ingredientes('pera',1)]
};

export function shoppingListReducer (
    state = initialState,
    action: shoppingListAction.shoppingListType
) {
    switch (action.type) {
        case shoppingListAction.ADD_INGREDIENTE:
            return {
                ...state,
                ingredientes: [...state.ingredientes, action.payload]
            }
        case shoppingListAction.ADD_INGREDIENTES:
            return {
                ...state,
                ingredientes: [...state.ingredientes, ...action.payload]
            }
    }
}