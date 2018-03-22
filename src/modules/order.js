import orderService from './services/order.service';

export const SET_ORDER_DETAILS = 'order/SET_ORDER_DETAILS';

const initialState = {
  orderDetails: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_DETAILS:
      const orderDetails = action.payload.orderDetails;
      return {
        ...state,
        orderDetails,
      };

    default:
      return state
  }
}

export const fetchOrderDetails = (order) => {
  return (dispatch) => {
    return orderService.getOrderDetailsById(order.id).then((orderDetails) => {
      dispatch({
        type: SET_ORDER_DETAILS,
        payload: {
          orderDetails
        }
      });
      return orderDetails;
    });
  }
};

