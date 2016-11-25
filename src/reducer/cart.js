import {handleActions} from 'redux-actions';
import {CLEAR_ITEMS, ADD_ITEM, SET_QUANTITY, DELETE_ITEM} from 'action/types';
import map from 'lodash/fp/map';

function checkMatchedIds(id, items) {
  const check = items.filter((value) => {
    return value.id === id;
  });

  return check.length > 0 ? true : false;
}
function removeItemFromList(id, items) {
  const filtered = items.filter((value) => {
    return value.id !== id;
  });
  return filtered;
}

export default handleActions({
  [CLEAR_ITEMS]: () => ({
    items: [],
  }),
  [ADD_ITEM]: (state, {payload: id}) => ({
    ...state,
    items:
      checkMatchedIds(id, state.items)
      ? state.items :
      [...state.items, {id, quantity: 1}],
      // added this to make it so that it didnt keep adding new items everytime.
      // TODO increment the counter everytime.
  }),
  [SET_QUANTITY]: (state, {payload: {id: target, quantity}}) => ({
    ...state,
    items: quantity <= 0 ?
    removeItemFromList(target, state.items) :
    map(({id, ...rest}) => (
      target === id ? {id, ...rest, quantity} : {id, ...rest}
    ), state.items),
  }),
  [DELETE_ITEM]: (state, {payload: id}) => ({
    ...state,
    items: removeItemFromList(id, state.items),
  }),
}, {
  items: [],
});
