import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";

import UserTemplate from "./template/user/UserTemplate";
import Home from "./pages/Home/Home";
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import "./assets/scss/style.scss";
import MUIThemeProvider from "./themes/MUIThemeProvider";
import RoomList from "./pages/RoomList/RoomList";

export const history = createBrowserHistory();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(

      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path="" element={<UserTemplate />}>
              <Route index element={<Home />}></Route>
              <Route path="/roomlist" >
                <Route path=':id' element={<RoomList/>}></Route>
              </Route>
            </Route>
          </Routes>
        </HistoryRouter>
      </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
