import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../store/actions/projectActions";
import Autocomplete from "react-autocomplete";

function Project({ setProject, projectName, setProjectName }) {
  const dispatch = useDispatch();
  // let [projectName, setProjectName] = React.useState("");
  const { projects } = useSelector((state) => state.project);

  React.useEffect(() => {
    dispatch(getProjects());
  }, []);
  return (
    <>
      <div className="ms-welcome__main mt-2">
        <h2 className="link-label ms-font-xl ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20">
          Link Project
        </h2>
        <div>
          <Autocomplete
            wrapperStyle={{
              position: "relative",
              width: "100%",
            }}
            inputProps={{
              style: {
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              },
            }}
            menuStyle={{
              position: "absolute",
              top: "100%",
              left: 0,
              zIndex: 1,
              width: "100%",
              maxHeight: "200px",
              overflowY: "auto",
              backgroundColor: "white",
              borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              border: "1px solid #ccc",
            }}
            getItemValue={(item) => JSON.stringify(item)}
            items={projects}
            renderItem={(item) => (
              <div
                style={{
                  cursor: "pointer",
                  background:
                    projectName !== "" && item?.projectName?.toLowerCase().includes(projectName?.toLowerCase())
                      ? "lightgray"
                      : "white",
                }}
              >
                {item.projectName}
              </div>
            )}
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
              console.log("OnChange of project", e.target.value);
            }}
            onSelect={(val) => {
              let data = JSON.parse(val);
              setProjectName(data?.projectName);
              setProject(data?.projectId);
              console.log("ONSelect run..", data, data?.projectId);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Project;
