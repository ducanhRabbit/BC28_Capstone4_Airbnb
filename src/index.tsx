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
import Profile from "./pages/Profile/Profile";
import MobileProfile from "./pages/Profile/MobileProfile";
import ResponsiveItem from "./HOC/ResponsiveItem";
import RoomList from "./pages/RoomList/RoomList";
import Detail from "./pages/Detail/Detail";
import AdminTemplate from "./template/Admin/AdminTemplate";
import QuanLyThongTinPhong from "./pages/Admin/QuanLyThongTinPhong/QuanLyThongTinPhong";

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
          <Route path="detail">
            <Route path=":id" element={<Detail />}></Route>
          </Route>
          <Route path="/roomlist">
            <Route path=":id" element={<RoomList />}></Route>
          </Route>
          <Route path="/login" element={<Loign />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/profile"
            element={
              <ResponsiveItem
                Component={Profile}
                ComponentMobile={MobileProfile}
              />
            }
          ></Route>
          <Route path="*" element={<Navigate to="" />}></Route>
        </Route>
        <Route path="admin" element={<AdminTemplate />}>
          <Route path="*" element={<Navigate to="" />}></Route>
          <Route path="thongtinphong" element={<QuanLyThongTinPhong />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
