const initialState = {
  projects: [],
  addOppProjectLoader: false,
};

const projectReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_PROJECTS":
      return {
        ...state,
        projects: payload,
      };
    case "ADD_OPP_PROJ_LOADER":
      return {
        ...state,
        addOppProjectLoader: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default projectReducer;
