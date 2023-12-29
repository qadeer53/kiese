import { RepositoryFactory } from "../../repository/RepositoryFactory";
let Projects = RepositoryFactory.get("project");

export const AddOppProjectLoader = (data) => async (dispatch) => {
  dispatch({
    type: "ADD_OPP_PROJ_LOADER",
    payload: data,
  });
};

export const getProjects = () => async (dispatch) => {
  try {
    const { data } = await Projects.getProjects();
    if (data) {
      dispatch({
        type: "GET_PROJECTS",
        // payload: data?.rows,
        payload: data?.data,
      });
    } else {
      dispatch({
        type: "GET_PROJECTS",
        payload: [],
      });
      // alert(data.message);
    }
  } catch (error) {
    dispatch({
      type: "GET_PROJECTS",
      payload: [],
    });
    // alert(error.message);
  }
};
