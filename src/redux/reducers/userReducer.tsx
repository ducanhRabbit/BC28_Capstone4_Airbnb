import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
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
type UpdateUser = {
  name: string;
  email: string;
  birthday: string;
  role: string;
  gender: boolean;
  phone: string;
};
export interface userLoginState {
  userLogin: userLogin;
}
const initialState = {
  userLogin: getStoreJSON(USER_LOGIN),
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUserLogin: (state: userLoginState, action: PayloadAction<userLogin>) => {
      state.userLogin = action.payload;
    },
  },
});

export const { setUserLogin } = userReducer.actions;

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
      history.push("/profile");
    } catch (error: any) {
      let err = error.response.data.content;
      alert(err);
      console.log({ error });
    }
  };
};
// Call api get user
export const getUserAPi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(`/users/${id}`);
      console.log({ result });
      let action = setUserLogin(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log({ err });
    }
  };
};
export const getDatphongApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(`/dat-phong/lay-theo-nguoi-dung/${id}`);
      console.log({ result });
    } catch (error) {
      console.log({ error });
    }
  };
};
// call api put user
export const putUseApi = (id: number, data: UpdateUser) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.put(`/users/${id}`, data);
      console.log({ result });
      //Chuyển về trang profile
      // history.push("/profile");
      window.location.reload();
      let action = setUserLogin(result.data.content);
      dispatch(action);
    } catch (error) {
      console.log({ error });
    }
  };
};
