import {ADD_ITEM, SET_QUANTITY, CLEAR_ITEMS, DELETE_ITEM} from './types';
import {createAction} from 'redux-actions';

export const add = createAction(ADD_ITEM);
export const setQuantity = createAction(SET_QUANTITY);
export const clear = createAction(CLEAR_ITEMS);
export const deleteVal = createAction(DELETE_ITEM);
