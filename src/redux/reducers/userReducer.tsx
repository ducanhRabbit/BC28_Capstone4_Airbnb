import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { http } from "../../util/setting";
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
  //   userLogin: userLogin,
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
      let result = await http.post("/auth/signup", {
        data,
      });
      console.log({ result });
    } catch (error) {
      console.log({ error });
    }
  };
};
