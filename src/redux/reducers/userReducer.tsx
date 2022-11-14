import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
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

export interface userLogin {
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
  userLogin: userLogin | null
  userData: userLogin[];
  totalRow: number;
}
const initialState = {
  userLogin: getStoreJSON(USER_LOGIN),
  userData: [],
  totalRow: 0,
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUserLogin: (state: userLoginState, action: PayloadAction<userLogin | null>) => {
      let userLogin = action.payload;
      state.userLogin = userLogin;
    },
    getUserData: (
      state: userLoginState,
      action: PayloadAction<userLogin[]>
    ) => {
      state.userData = action.payload;
    },
    setTotalRows: (state: userLoginState, action: PayloadAction<number>) => {
      state.totalRow = action.payload;
    },
    handleDelUser: (state: userLoginState, action: PayloadAction<number>) => {
      state.totalRow -= 1;
    },
  },
});

export const { setUserLogin, getUserData, setTotalRows, handleDelUser } =
  userReducer.actions;

export default userReducer.reducer;

/// Call api post signup
export const postSignupUser = (data: userLogin) => {
  console.log({ data });
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.post("/auth/signup", data);
      console.log({ result });
      let dataLogin = {
        email: data.email,
        password: data.password,
      };
      let action = postSignin(dataLogin);
      dispatch(action);
      // history.push("/login");
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
      // Lưu lại user_Login
      setStoreJSON(USER_LOGIN, result.data.content);
      //Đưa userLogin lên redux
      let user: userLogin = result.data.content.user;
      console.log(user.role);
      let action = setUserLogin(user);
      dispatch(action);

      // if role: user chuyển về page profile còn admin thì chuyển thì template admin

      if (user.role == "USER") {
        history.push("/profile");
      } else {
        history.push("/admin");
      }
    } catch (error: any) {
      let err = error.response.data.content;
      alert(err);
      console.log({ error });
    }
  };
};
// Call api get user
export const getUserAPi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(`/users/${getStoreJSON(USER_LOGIN).user.id}`);
      console.log({ result });
      let action = setUserLogin(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log({ err });
      history.push("/login");
    }
  };
};

// call api put user
export const putUserApi = (id: number, data: UpdateUser) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.put(`/users/${id}`, data);
      console.log({ result });
      // Chuyển về trang profile
      let action = setUserLogin(result.data.content);
      dispatch(action);
      window.location.reload();
    } catch (error) {
      console.log({ error });
    }
  };
};

export const getPaginationUserAPI = (index: number, pageSize: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(
        `/users/phan-trang-tim-kiem?pageIndex=${index}&pageSize=${pageSize}`
      );
      const action = getUserData(result.data.content.data);
      dispatch(action);
      const totalrowsAction = setTotalRows(result.data.content.totalRow);
      dispatch(totalrowsAction);
    } catch (err) {
      console.log(err);
    }
  };
};

// Call API delete user

export const delUserAPI = (idUser: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      await http.delete(`/users?id=${idUser}`);
      let action = handleDelUser(idUser);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};
