import * as React from "react";
import Header from "./Header";
import Opportunity from "./Opportunity";
import Project from "./Project";
import { useState } from "react";
import axios from "axios";
import { checkContact, createContact } from "../store/actions/contactActions";
import { useDispatch, useSelector } from "react-redux";
import { Card, Container, Spinner } from "reactstrap";
import { createAccount, AddAccountLoader } from "../store/actions/accountActions";
import cheerio from "cheerio";
import { AddOppLoader, createOpportunity } from "../store/actions/opportunityActions";
import CustomAvatar from "./CustomAvatar";
import { AddOppProjectLoader } from "../store/actions/projectActions";
import Login from "./Login";
import { logout } from "../store/actions/authActions";
// import puppeteer from "puppeteer";

/* global require */

function App() {
  const dispatch = useDispatch();
  const [project, setProject] = useState(null);
  const [opportunity, setOpportunity] = useState(null);
  const [body, setBody] = useState("");
  const { isContactExists, loading, addContactLoader } = useSelector((state) => state.contact);
  const { addAccountLoader } = useSelector((state) => state.account);
  const { addOppLoader } = useSelector((state) => state.opportunity);
  const { addOppProjectLoader } = useSelector((state) => state.project);
  const { uid, appUserDetails } = useSelector((state) => state.auth);

  let [opportunityName, setOpportunityName] = useState("");
  let [projectName, setProjectName] = useState("");

  const currentDate = new Date();

  const [crmError, setCrmError] = useState("");

  const [opportunityError, setOpportunityError] = useState("");
  const [successMessages, setSuccessMessages] = useState({
    contact: false,
    opportunity: false,
  });

  // Format the date and time according to your desired format
  const formattedCurrentDate = currentDate.toISOString();

  let handleCreateOpportunity = async () => {
    try {
      dispatch(AddOppLoader(true));
      const apiKey = "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";
      const model = "text-davinci-003"; // You can experiment with different models
      const prompt = `Please summarize the following paragraph in Five words:\n\n${body}`;
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: model,
          prompt: prompt,
          max_tokens: 30, // Adjust the max_tokens value for desired length
          temperature: 0.3, // Adjust the temperature for desired creativity
          n: 1, // Generate a single completion
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const heading = response.data.choices[0].text.trim();
      let obj = {
        opportunityName: heading,
        opportunityStatusId: 10,
        opportunityStageId: null,
        contractTypeId: null,
        projectNo: null,
        projectName: null,
        clientAccountId: appUserDetails?.appUserId,
        // clientAccountId: 101,
        // primaryClientAccountContactId: 101,
        primaryClientAccountContactId: null,
        projectSize: null,
        value: null,
        marketSegmentId: null,
        streetAddress: null,
        city: null,
        stateProvince: null,
        zipCode: null,
        winProbability: null,
        dueDate: null,
        securedDate: null,
        // internalContactId: 116,
        internalContactId: null,
        // createdUTC: "2020-10-17T21:11:53.4500000",
        // updatedUTC: "2023-01-17T21:22:25.3533333",
        createdUTC: formattedCurrentDate,
        updatedUTC: formattedCurrentDate,

        // createdById: 101,
        // updatedById: 102,
        createdById: appUserDetails?.appUserId,
        updatedById: appUserDetails?.appUserId,
      };
      dispatch(
        createOpportunity(
          obj,
          () => {
            setSuccessMessages((prev) => ({ ...prev, opportunity: true }));
            setTimeout(() => {
              setSuccessMessages((prev) => ({ ...prev, opportunity: false }));
            }, 2500);
          },
          (err) => {
            setOpportunityError(err || "Something went wrong!");
            setTimeout(() => {
              setOpportunityError("");
            }, 2500);
          }
        )
      );
    } catch (err) {
      setOpportunityError("Something went wrong!");
      dispatch(AddOppLoader(false));
      setTimeout(() => {
        setOpportunityError("");
      }, 2500);
    }
  };

  let handlelinkClick = async () => {
    try {
      dispatch(AddOppProjectLoader(true));
      let obj = {
        id: Office?.context?.mailbox?.item?.itemId,
        threadId: Office?.context?.mailbox?.item?.conversationId,
        internalDate: Office?.context?.mailbox?.item?.dateTimeCreated,
        to: Office?.context?.mailbox?.item?.to?.map((val) => {
          return val?.emailAddress;
        }),
        cc: Office?.context?.mailbox?.item?.cc?.map((val) => {
          return val?.emailAddress;
        }),
        from: Office?.context?.mailbox?.item?.sender?.emailAddress,
        subject: Office?.context?.mailbox?.item?.subject,
        messageText: body,
        snippet: body,
        oppurtunity_id: opportunity ? opportunity : 101,
        project_id: project ? project : 113,
        // user_id: 102,
        user_id: appUserDetails?.appUserId,
        type: "sent",
      };
      await axios.post("https://email-provider-backend.herokuapp.com/gmail/link", obj);
      setProject(null);
      setOpportunity(null);
      setProjectName("");
      setOpportunityName(" ");
      dispatch(AddOppProjectLoader(false));
    } catch (err) {
      console.log("ErrCheck--> ", err);
      dispatch(AddOppProjectLoader(false));
      setCrmError(err?.response?.data?.message || "Something went wrong");

      setTimeout(() => {
        setCrmError("");
      }, 2500);
    }
  };
  async function handleClick(companyDomain) {
    try {
      dispatch(AddAccountLoader(true));
      let url = companyDomain?.substring(companyDomain?.lastIndexOf("@") + 1);
      let { data } = await axios.get(`https://cors-platform.herokuapp.com/https://www.${url}`);
      const $ = cheerio.load(data);
      const accountName = $("title").text();
      // dispatch(
      //   createAccount({
      //     accountName: accountName,
      //     accountDetails: null,
      //     accountTypeId: 101,
      //     ownerTypeId: 102,
      //     accountOwnerId: null,
      //     streetAddress: null,
      //     city: null,
      //     stateProvince: null,
      //     zipCode: null,
      //     phoneNo: null,
      //     email: null,
      //     website: `https://www.${url}`,
      //     inactive: null,
      //   })
      // );
      dispatch(
        createContact(
          {
            externalContactName: Office?.context?.mailbox?.item?.sender?.displayName,
            externalContactDetails: null,
            address: null,
            role: null,
            phoneNo: null,
            email: Office?.context?.mailbox?.item?.sender?.emailAddress,
            inactive: null,
            createdById: appUserDetails?.appUserId,
            updatedById: appUserDetails?.appUserId,
          },
          () => {},
          (err) => {
            setCrmError(err || "Something went wrong");
            dispatch(AddAccountLoader(false));
            setTimeout(() => {
              setCrmError("");
            }, 2500);
          }
        )
      );
      // dispatch(AddAccountLoader(false));
    } catch (err) {
      setCrmError("Something went wrong");
      dispatch(AddAccountLoader(false));
      setTimeout(() => {
        setCrmError("");
      }, 2500);
    }
  }
  React.useEffect(() => {
    dispatch(checkContact(Office?.context?.mailbox?.item?.sender?.emailAddress));
    Office?.context?.mailbox?.item?.body?.getAsync(Office.CoercionType.Text, function (result) {
      if (result.status === "succeeded") {
        setBody(result?.value);
      }
    });
  }, []);

  return (
    <>
      {/* <CustomAvatar
        imageUrl="https://firebasestorage.googleapis.com/v0/b/acies-cfc88.appspot.com/o/PlatenKnife.png?alt=media&token=0a79e524-67a2-4018-82de-d5c5cccf0553"
        name="John Doe"
       */}

      {!uid ? (
        <Login />
      ) : (
        <>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center my-5 w-100">
              <Spinner className="d-flex mx-auto" style={{ color: "#f67959" }} size="lg" />
            </div>
          ) : (
            <Container fluid>
              <div className="d-flex justify-content-end">
                <button
                  className="logout-btn"
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  <i className="mr-2 fa fa-sign-out" aria-hidden="true"></i>
                  Logout
                </button>
              </div>

              {isContactExists ? (
                <>
                  <Card className="ms-welcome__card px-3 py-4 mt-3">
                    {/* <Header logo={require("./../../../assets/logo-filled.png")} message="Welcome" /> */}
                    <Opportunity
                      setOpportunity={setOpportunity}
                      opportunityName={opportunityName}
                      setOpportunityName={setOpportunityName}
                    />
                    <Project setProject={setProject} projectName={projectName} setProjectName={setProjectName} />
                  </Card>
                  <Card className="ms-welcome__card px-3 py-4 mt-3">
                    <h2 className="ms-welcome__card-heading text-start ">Contact Profile</h2>
                    <div className="d-flex justify-content-center my-2">
                      <CustomAvatar name={Office?.context?.mailbox?.item?.sender?.emailAddress} />
                    </div>
                    <p className="ms-welcome__card-email text-center">
                      {Office?.context?.mailbox?.item?.sender?.emailAddress}
                    </p>
                    <div className="ms-welcome__main d-flex justify-content-center align-items-center ">
                      <button
                        className="custom-btn"
                        onClick={handlelinkClick}
                        disabled={addOppProjectLoader || !project || !opportunity}
                      >
                        {addOppProjectLoader ? (
                          <Spinner className="d-flex mx-auto" style={{ color: "#ffffff" }} size="sm" />
                        ) : (
                          <>
                            {" "}
                            <i className="fa fa-plus mr-2"></i> Open in CRM
                          </>
                        )}
                      </button>
                    </div>

                    {crmError != "" && <p className="mt-3 text-danger text-small text-center">Something went wrong</p>}

                    {/* <div className="ms-welcome">
                <Header logo={require("./../../../assets/logo-filled.png")} message="Welcome" />
                <Opportunity setOpportunity={setOpportunity} />
                <Project setProject={setProject} />
                <h2 className="ms-welcome__main">Contact Profile</h2>
                <p className="ms-welcome__main">{Office?.context?.mailbox?.item?.sender?.emailAddress}</p>
                <div className="ms-welcome__main">
                  <button onClick={handlelinkClick}>Connect</button>
                </div>
              </div> */}
                  </Card>
                </>
              ) : (
                <Card className="ms-welcome__card px-3 py-4 mt-3">
                  <h2 className="ms-welcome__card-heading text-start">Contact Profile</h2>
                  <div className="d-flex justify-content-center my-2">
                    <CustomAvatar name={Office?.context?.mailbox?.item?.sender?.emailAddress} />
                  </div>

                  <p className="ms-welcome__card-email text-center">
                    {Office?.context?.mailbox?.item?.sender?.emailAddress}
                  </p>

                  <div className="ms-welcome__main d-flex justify-content-center align-items-center ">
                    <button
                      className="custom-btn"
                      onClick={() => handleClick(Office?.context?.mailbox?.item?.sender?.emailAddress)}
                      disabled={addContactLoader || addAccountLoader}
                    >
                      {addContactLoader || addAccountLoader ? (
                        <Spinner className="d-flex mx-auto" style={{ color: "#ffffff" }} size="sm" />
                      ) : (
                        <>
                          <i className="fa fa-plus mr-2"></i> Add to CRM
                        </>
                      )}
                    </button>
                  </div>

                  {crmError != "" && <p className="mt-3 text-danger text-small text-center">Something went wrong</p>}

                  {/* <div className="ms-welcome">
                <h2 className="ms-welcome__main">Contact Profile</h2>
                <p className="ms-welcome__main">{Office?.context?.mailbox?.item?.sender?.emailAddress}</p>

                <div className="ms-welcome__main">
                  <button onClick={() => handleClick(Office?.context?.mailbox?.item?.sender?.emailAddress)}>
                    Add Contact
                  </button>
                </div>
              </div> */}
                </Card>
              )}
              <>
                <div className="ms-welcome__main d-flex justify-content-center my-4">
                  <button className="custom-btn" onClick={handleCreateOpportunity} disabled={addOppLoader}>
                    {addOppLoader ? (
                      <Spinner className="d-flex mx-auto" style={{ color: "#ffffff" }} size="sm" />
                    ) : (
                      "Create Opportunity"
                    )}
                  </button>
                </div>
                {opportunityError != "" && (
                  <p className="my-3 text-danger text-small text-center">{opportunityError}</p>
                )}
                {successMessages?.opportunity && (
                  <p className="my-3 text-success text-small text-center">Opportunity created successfully!</p>
                )}
              </>
            </Container>
          )}
        </>
      )}
    </>
  );
}
export default App;
