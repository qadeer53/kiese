import { RepositoryFactory } from "../../repository/RepositoryFactory";
let account = RepositoryFactory.get("account");

export const AddAccountLoader = (data) => async (dispatch) => {
  dispatch({
    type: "ADD_ACCOUNT_LOADER",
    payload: data,
  });
};

export const createAccount = (payload) => async (dispatch) => {
  dispatch(AddAccountLoader(true));
  try {
    const { data } = await account.createAccount(payload);
    if (data) {
      dispatch(AddAccountLoader(false));
    } else {
      // alert(data?.message);
      dispatch(AddAccountLoader(false));
    }
  } catch (error) {
    // alert(error?.message);
    dispatch(AddAccountLoader(false));
  }
};
