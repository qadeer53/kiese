const initialState = {
  isContactExists: false,
  loading: false,
  addContactLoader: false,
};

const contactReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "IS_CONTACT_EXISTS":
      return {
        ...state,
        isContactExists: payload,
      };
    case "CONTACT_LOADER":
      return {
        ...state,
        loading: payload,
      };
    case "ADD_CONTACT_LOADER":
      return {
        ...state,
        addContactLoader: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default contactReducer;
