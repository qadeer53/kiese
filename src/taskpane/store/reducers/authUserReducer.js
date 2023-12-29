const initialState = {
  loading: false,
};

const authUserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_AUTH_LOADING":
      return {
        ...state,
        loading: payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default authUserReducer;
