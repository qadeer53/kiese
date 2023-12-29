const initialState = {
  addAccountLoader: false,
};

const accountReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_ACCOUNT_LOADER":
      return {
        ...state,
        addAccountLoader: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default accountReducer;
