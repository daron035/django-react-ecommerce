import axios from "axios";
import { CART_START, CART_SUCCESS, CART_FAIL } from "./types";

export const fetchCart = () => async (dispatch) => {
  // access token in local storage
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    dispatch({
      type: CART_START,
    });

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/order-summary/`,
        // `http://85.193.81.247/api/order-summary/`,
        config
      );
      dispatch({
        type: CART_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      if (err.response.status === 404) {
        dispatch({
          type: CART_FAIL,
          error: "You currently do not have an order",
        });
      } else {
        dispatch({
          type: CART_FAIL,
          error: err.message,
        });
      }
    }
  } else {
    dispatch({
      type: CART_FAIL,
    });
  }
};

/////////////////////// Другая реализация fetchCart ///////////////////////
// import { orderSummaryURL } from "../../contacts";
// import { authAxios } from "../../utils";
// import { CART_START, CART_SUCCESS, CART_FAIL } from "./types";

// export const cartStart = () => {
//   return {
//     type: CART_START
//   };
// };

// export const cartSuccess = data => {
//   return {
//     type: CART_SUCCESS,
//     data
//   };
// };

// export const cartFail = error => {
//   return {
//     type: CART_FAIL,
//     error: error
//   };
// };

// export const fetchCart = () => {
//   return dispatch => {
//     dispatch(cartStart());
//     authAxios
//       .get(orderSummaryURL)
//       .then(res => {
//         dispatch(cartSuccess(res.data));
//       })
//       .catch(err => {
//         dispatch(cartFail(err));
//       });
//   };
// };
