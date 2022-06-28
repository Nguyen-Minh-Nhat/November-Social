import React, { Suspense } from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App";
import "./i18n/config";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.min.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <Suspense fallback={<div>Loading...</div>}>
            <ToastContainer />
            <GoogleOAuthProvider clientId="1096441693667-ngdvimskmd1trh82ptlngqedcbr82s38.apps.googleusercontent.com">
              <App />
            </GoogleOAuthProvider>
          </Suspense>
        </PersistGate>
      </Provider>
    </Router>
  </React.StrictMode>,
);
