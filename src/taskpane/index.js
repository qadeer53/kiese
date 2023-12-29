import App from "./components/App";
import { AppContainer } from "react-hot-loader";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import * as React from "react";
import * as ReactDOM from "react-dom";
import store from "./store/index";
import { Provider } from "react-redux";
// import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/css/bootstrap.min.css";

import "./css/index.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Amplify } from "aws-amplify";
import awsExports from "./config/aws-exports";

Amplify.configure({
  Auth: {
    region: awsExports.REGION,
    userPoolId: awsExports.USER_POOL_ID,
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID,
  },
});

/* global document, Office, module, require */

initializeIcons();

let isOfficeInitialized = false;

const title = "Contoso Task Pane Add-in";

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component title={title} isOfficeInitialized={isOfficeInitialized} />
      </AppContainer>
    </Provider>,
    document.getElementById("container")
  );
};

/* Render application after Office initializes */
Office.onReady(() => {
  isOfficeInitialized = true;
  render(App);
});

/* Initial render showing a progress bar */
render(App);

if (module.hot) {
  module.hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    render(NextApp);
  });
}
