const initialState = {
  opportunities: [],
  addOppLoader: false,
};

const opportunityReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_OPPORTUNITIES":
      return {
        ...state,
        opportunities: payload,
      };
    case "ADD_OPP_LOADER":
      return {
        ...state,
        addOppLoader: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default opportunityReducer;
