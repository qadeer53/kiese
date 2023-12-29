const initialState = {
  uid: null,
  user: null,
  appUserDetails: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        uid: payload.username,
        user: payload.username,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        uid: null,
        user: null,
        appUserDetails: null,
      };
    case "SET_APP_USER_ID":
      console.log("Going to set app user id.... ", payload);
      return {
        ...state,
        appUserDetails: payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
