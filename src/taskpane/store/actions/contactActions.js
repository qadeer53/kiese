import { RepositoryFactory } from "../../repository/RepositoryFactory";
let Contacts = RepositoryFactory.get("contact");

const Loader = (data) => async (dispatch) => {
  dispatch({
    type: "CONTACT_LOADER",
    payload: data,
  });
};

const AddContactLoader = (data) => async (dispatch) => {
  dispatch({
    type: "ADD_CONTACT_LOADER",
    payload: data,
  });
};

export const checkContact = (email) => async (dispatch) => {
  dispatch(Loader(true));
  console.log("Going to check contact contact...", email);
  try {
    const { data } = await Contacts.searchContact(email);
    if (data?.rows?.length > 0) {
      console.log("In if... of check contact");

      dispatch({
        type: "IS_CONTACT_EXISTS",
        payload: true,
      });
      dispatch(Loader(false));
    } else {
      console.log("In else... of check contact");

      dispatch({
        type: "IS_CONTACT_EXISTS",
        payload: false,
      });
      dispatch(Loader(false));
    }
  } catch (error) {
    console.log("Error in check contact...", error);

    dispatch({
      type: "IS_CONTACT_EXISTS",
      payload: false,
    });
    // alert(error?.message);
    dispatch(Loader(false));
  }
};

export const createContact =
  (payload, onSuccess = () => {}, onError = () => {}) =>
  async (dispatch) => {
    dispatch(AddContactLoader(true));
    try {
      const { data } = await Contacts.createContact(payload);
      if (data) {
        dispatch(AddContactLoader(false));
        dispatch(checkContact(data?.newRecHdr?.externalContactNo));
        onSuccess();
      } else {
        // alert(data?.message);
        dispatch(AddContactLoader(false));
        onError("Something went wrong");
      }
    } catch (error) {
      // alert(error?.message);
      onError(error?.response?.data?.message || "Something went wrong");

      dispatch(AddContactLoader(false));
    }
  };
