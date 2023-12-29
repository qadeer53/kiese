import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOpportunities } from "../store/actions/opportunityActions";
import Autocomplete from "react-autocomplete";

function Opportunity({ setOpportunity, opportunityName, setOpportunityName }) {
  const dispatch = useDispatch();
  // let [opportunityName, setOpportunityName] = React.useState("");
  const { opportunities } = useSelector((state) => state.opportunity);
  React.useEffect(() => {
    dispatch(getOpportunities());
  }, []);
  return (
    <div className="ms-welcome__main">
      <h2 className="link-label ms-font-xl ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20">
        Link Opportunity
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
          items={opportunities}
          renderItem={(item) => (
            <div
              style={{
                cursor: "pointer",
                background:
                  opportunityName !== "" &&
                  item?.opportunityName?.toLowerCase().includes(opportunityName?.toLowerCase())
                    ? "lightgray"
                    : "white",
              }}
            >
              {item?.opportunityName}
            </div>
          )}
          value={opportunityName}
          onChange={(e) => {
            setOpportunityName(e.target.value);
          }}
          onSelect={(val) => {
            let data = JSON.parse(val);
            setOpportunityName(data?.opportunityName);
            setOpportunity(data?.opportunityId);
            console.log("Opportunities", data, data?.opportunityId);
          }}
        />
      </div>
    </div>
  );
}

export default Opportunity;
