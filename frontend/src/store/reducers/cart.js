
import { CART_START, CART_SUCCESS, CART_FAIL } from "../actions/types";

const initialState = {
  shoppingCart: null,
  error: null,
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CART_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case CART_SUCCESS:
      return {
        ...state,
        shoppingCart: payload,
        error: null,
        loading: false,
      };
    case CART_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}


/////////////////////// Другая реализация fetchCart ///////////////////////
// import { CART_START, CART_SUCCESS, CART_FAIL } from "../actions/types";
// import { updateObject } from "../utility";

// const initialState = {
//   shoppingCart: null,
//   error: null,
//   loading: false
// };

// const cartStart = (state, action) => {
//   return updateObject(state, {
//     error: null,
//     loading: true
//   });
// };

// const cartSuccess = (state, action) => {
//   return updateObject(state, {
//     shoppingCart: action.data,
//     error: null,
//     loading: false
//   });
// };

// const cartFail = (state, action) => {
//   return updateObject(state, {
//     error: action.error,
//     loading: false
//   });
// };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CART_START:
//       return cartStart(state, action);
//     case CART_SUCCESS:
//       return cartSuccess(state, action);
//     case CART_FAIL:
//       return cartFail(state, action);
//     default:
//       return state;
//   }
// };

// export default reducer;
