import React from "react";
import ReactDOM from "react-dom";
import { PageRouter } from "./Home";
import { Provider } from "react-redux";
import { store, persistor } from "./_helpers";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <PageRouter />
    </PersistGate>
  </Provider>,

  document.getElementById("root")
);
