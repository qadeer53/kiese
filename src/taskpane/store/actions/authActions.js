import "crypto-js/lib-typedarrays";
import { Auth } from "@aws-amplify/auth";
import axios from "axios";
export const setAuthLoading = (val) => async (dispatch) => {
  dispatch({ type: "SET_AUTH_LOADING", payload: val });
};

export const signIn =
  (payload, onSuccess = () => {}, onError = () => {}) =>
  async (dispatch) => {
    dispatch(setAuthLoading(true));
    console.log("Signin...", payload);
    Auth.signIn(payload?.email, payload?.password)
      .then(async (res) => {
        console.log("Response", res);

        try {
          if (res?.challengeName == "NEW_PASSWORD_REQUIRED") {
            dispatch(setAuthLoading(false));
            onError("Please go to kiese site to set new password!");
          } else {
            if (res?.username) {
              let { data } = await axios.post("https://email-provider-backend.herokuapp.com/api/user-detail", {
                userName: res?.username,
              });
              console.log("Response from api", data);

              if (data?.data?.length > 0) {
                dispatch({ type: "SET_APP_USER_ID", payload: data?.data[0] });
                dispatch({ type: "LOGIN_SUCCESS", payload: res });
                dispatch(setAuthLoading(false));
              } else {
                dispatch(setAuthLoading(false));
                onError("User not found!");
              }
            } else {
              dispatch(setAuthLoading(false));
              onError("User not found!");
            }
          }
        } catch (error) {
          console.log("Error in catch", error);
          dispatch(setAuthLoading(false));
        }
      })
      .catch((err) => {
        console.log("Error..", err);
        dispatch(setAuthLoading(false));
        onError(err?.message);
      });
  };

export const logout = () => async (dispatch) => {
  try {
    // await Auth.signOut();
    localStorage.clear();

    dispatch({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    dispatch({ type: "LOGOUT_SUCCESS" });
  }
};

export const signOut = (payload) => async (dispatch) => {};
