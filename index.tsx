/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import history from "history/browser";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { App } from "./common";
import { createRelay } from "./core/relay";
import rootReducer from "./reducers/rootReducer";
const store = createStore(rootReducer, composeWithDevTools());

// Dehydrate the initial API response and initialize a Relay store
// https://developer.mozilla.org/docs/Web/HTML/Element/script#embedding_data_in_html
const data = (document.getElementById("data") as HTMLScriptElement).text;
const records = data ? JSON.parse(data) : undefined;
const relay = createRelay({ records });

// Render the top-level React component
ReactDOM.render(
  <Provider store={store}>
    <App history={history} relay={relay} />
  </Provider>,
  document.getElementById("root")
);
