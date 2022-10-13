import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";

import UserTemplate from "./template/user/UserTemplate";
import Home from "./pages/Home/Home";
import {
  Navigate,
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import "./assets/scss/style.scss";
import Loign from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import DemoFormik from "./pages/Register/DemoFormik";
import Profile from "./pages/Profile/Profile";

export const history = createBrowserHistory();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<UserTemplate />}>
          <Route index element={<Home />}></Route>
          <Route path="/login" element={<Loign />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/formik" element={<DemoFormik />}></Route>
          <Route path="/profile" element={<Profile />}></Route>

          <Route path="*" element={<Navigate to="" />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
