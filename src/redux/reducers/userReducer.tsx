import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setLocale } from "yup";
import { history } from "../..";
import {
  ACCESS_TOKEN,
  getStoreJSON,
  http,
  setStore,
  setStoreJSON,
  TOKEN_CYBERSOFT,
  USER_LOGIN,
} from "../../util/setting";
import { AppDispatch } from "../configStore";

interface userLogin {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  birthday?: string;
  gender?: boolean;
  role?: string;
}
export interface userLoginState {
  userLogin: userLogin;
}
const initialState = {
  userLogin: getStoreJSON(USER_LOGIN),
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {},
});

export const {} = userReducer.actions;

export default userReducer.reducer;

/// Call api post signup
export const postSignupUser = (data: userLogin) => {
  console.log({ data });
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.post("/auth/signup", data);
      console.log({ result });
      history.push("/login");
    } catch (error: any) {
      console.log({ error });
      alert(error.response.data.content);
    }
  };
};

// Call api  post signin
export const postSignin = (data: userLogin) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.post("/auth/signin", data);
      console.log({ result });
      //LƯU TOKEN VÀO LOCALSTORE
      setStore(ACCESS_TOKEN, result.data.content.token);
      // Lưu lại email
      setStoreJSON(USER_LOGIN, result.data.content);
    } catch (error: any) {
      let err = error.response.data.content;
      alert(err);
      console.log({ error });
    }
  };
};
