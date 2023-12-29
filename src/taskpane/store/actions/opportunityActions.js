import { RepositoryFactory } from "../../repository/RepositoryFactory";
let Opportunities = RepositoryFactory.get("opportunity");
export const AddOppLoader = (data) => async (dispatch) => {
  dispatch({
    type: "ADD_OPP_LOADER",
    payload: data,
  });
};
export const getOpportunities = () => async (dispatch) => {
  try {
    const { data } = await Opportunities.getOpportunities();
    if (data) {
      dispatch({
        type: "GET_OPPORTUNITIES",
        // payload: data?.rows,
        payload: data?.data,
      });
    } else {
      dispatch({
        type: "GET_OPPORTUNITIES",
        payload: [],
      });
      alert(data.message);
    }
  } catch (error) {
    dispatch({
      type: "GET_OPPORTUNITIES",
      payload: [],
    });
    alert(error.message);
  }
};

export const createOpportunity =
  (payload, onSuccess = () => {}, onError = () => {}) =>
  async (dispatch) => {
    dispatch(AddOppLoader(true));
    try {
      const { data } = await Opportunities.createOpportunity(payload);
      if (data) {
        dispatch(AddOppLoader(false));
        onSuccess();
      } else {
        // alert(data.message);
        dispatch(AddOppLoader(false));
        onError("Something went wrong");
      }
    } catch (error) {
      // alert(error.message);
      dispatch(AddOppLoader(false));
      onError(error?.response?.data?.message || "Something went wrong");
    }
  };
