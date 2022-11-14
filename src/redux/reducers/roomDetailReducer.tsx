import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch, RootState } from "../configStore";
import {
  getStoreJSON,
  http,
  TOKEN_CYBERSOFT,
  USER_LOGIN,
} from "../../util/setting";
import { message } from "antd";

export interface Room {
  id: number;
  tenPhong: string;
  khach: number;
  phongNgu: number;
  giuong: number;
  phongTam: number;
  moTa: string;
  giaTien: number;
  mayGiat: boolean;
  banLa: boolean;
  tivi: boolean;
  dieuHoa: boolean;
  wifi: boolean;
  bep: boolean;
  doXe: boolean;
  hoBoi: boolean;
  banUi: boolean;
  maViTri: number;
  hinhAnh: string;
}

export interface BookRoom {
  id: number;
  maPhong: number;
  ngayDen: string;
  ngayDi: string;
  soLuongKhach: number;
  maNguoiDung: number;
}

export interface RoomState {
  room: Room[];
  bookRoom: BookRoom[];
  arrBookRoom: BookRoom[];
  guestNumber: {
    nguoiLon: number;
    treEm: number;
    emBe: number;
    thuCung: number;
  };
  arrRoomPage: Room[];
}

const initialState: RoomState = {
  room: [],
  bookRoom: [],
  arrBookRoom: [],
  guestNumber: {
    nguoiLon: 1,
    treEm: 0,
    emBe: 0,
    thuCung: 0,
  },
  arrRoomPage: [],
};

const roomDetailReducer = createSlice({
  name: "roomDetailReducer",
  initialState,
  reducers: {
    getRoomDetail: (state, action: PayloadAction<Room>) => {
      state.room = [action.payload];
      console.log(state.room);
    },
    amountGuest: (
      state,
      action: PayloadAction<{ value: boolean; text: string }>
    ) => {
      let value1 = action.payload.value;
      let value2 = action.payload.text;
      let [roomDetail] = [...state.room];

      if (value1) {
        switch (value2) {
          case "nguoiLon":
            if (
              state.guestNumber.nguoiLon <
              roomDetail.khach - state.guestNumber.treEm
            ) {
              state.guestNumber.nguoiLon += 1;
            }
            break;
          case "treEm":
            if (
              state.guestNumber.treEm <
              roomDetail.khach - state.guestNumber.nguoiLon
            ) {
              state.guestNumber.treEm += 1;
            }
            break;
          case "emBe":
            state.guestNumber.emBe += 1;
            break;
          case "thuCung":
            state.guestNumber.thuCung += 1;
            break;
        }
      } else {
        if (value2 == "nguoiLon" && state.guestNumber.nguoiLon >= 2) {
          state.guestNumber.nguoiLon -= 1;
        }
        if (value2 == "treEm" && state.guestNumber.treEm >= 1) {
          state.guestNumber.treEm -= 1;
        }
        if (value2 == "emBe" && state.guestNumber.emBe >= 1) {
          state.guestNumber.emBe -= 1;
        }
        if (value2 == "thuCung" && state.guestNumber.thuCung >= 1) {
          state.guestNumber.thuCung -= 1;
        }
      }
    },
    filterBookedRoom: (state, action: PayloadAction<BookRoom[]>) => {
      let [roomDetail] = [...state.room];

      let result = action.payload.filter(
        (item: BookRoom) => item.maPhong == roomDetail?.id
      );
      state.arrBookRoom = result;
    },
    setRoomList: (state, action) => {
      state.room = action.payload;
    },
    setBookRoom: (state, action: PayloadAction<BookRoom[]>) => {
      state.bookRoom = action.payload;
    },

    setRoomPofile: (state: RoomState, action: PayloadAction<Room>) => {
      state.room = [action.payload];
    },
    setArrRoomPage: (state: RoomState, action: PayloadAction<Room[]>) => {
      state.arrRoomPage = action.payload;
    },
  },
});

export const {
  getRoomDetail,
  amountGuest,
  filterBookedRoom,
  setRoomList,
  setBookRoom,
  setRoomPofile,
  setArrRoomPage,
} = roomDetailReducer.actions;

export default roomDetailReducer.reducer;

//----------------api--------------------------
export const getRoomDetailApi = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      //   const result = await http.get('/phong-thue/1');
      const result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/phong-thue/${id}`,
        method: "GET",
        headers: {
          tokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyOCIsIkhldEhhblN0cmluZyI6IjI1LzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NzI4MzIwMDAwMCIsIm5iZiI6MTY0Nzk2ODQwMCwiZXhwIjoxNjc3NDMwODAwfQ.wEdmkKpVZbDB4s4L_cmLwJ1O8le8Cc-VMgLZCI-HvLA",
        },
      });
      const action = getRoomDetail(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const getBookRoomApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await axios({
        url: "https://airbnbnew.cybersoft.edu.vn/api/dat-phong",
        method: "GET",
        headers: {
          tokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyOCIsIkhldEhhblN0cmluZyI6IjI1LzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NzI4MzIwMDAwMCIsIm5iZiI6MTY0Nzk2ODQwMCwiZXhwIjoxNjc3NDMwODAwfQ.wEdmkKpVZbDB4s4L_cmLwJ1O8le8Cc-VMgLZCI-HvLA",
        },
      });
      const action = filterBookedRoom(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const postBookRoomApi = (room: BookRoom) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await axios({
        url: "https://airbnbnew.cybersoft.edu.vn/api/dat-phong",
        method: "POST",
        data: room,
        headers: {
          tokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyOCIsIkhldEhhblN0cmluZyI6IjI1LzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NzI4MzIwMDAwMCIsIm5iZiI6MTY0Nzk2ODQwMCwiZXhwIjoxNjc3NDMwODAwfQ.wEdmkKpVZbDB4s4L_cmLwJ1O8le8Cc-VMgLZCI-HvLA",
        },
      });
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };
};

export const getRoomListByLocation = (locationId: string | undefined) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(
        `/phong-thue/lay-phong-theo-vi-tri?maViTri=${locationId}`
      );
      const action = setRoomList(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};
// Call api lấy danh sách phòng để dàn layout page Quản lý thông tin phòng
export const getRoomALLApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get("/phong-thue");
      console.log({ result });
      // đưa lên redux (setRoomList)
      let action = setRoomList(result.data.content);
      dispatch(action);
    } catch (error) {
      console.log({ error });
    }
  };
};
export const getRoomPageApi = (page: number, pageSize: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(
        `/phong-thue/phan-trang-tim-kiem?pageIndex=${page}&pageSize=${pageSize}&keyword=`
      );
      console.log({ result });
      // đưa lên redux (setRoomList)
      let action = setArrRoomPage(result.data.content.data);
      dispatch(action);
    } catch (error) {
      console.log({ error });
    }
  };
};
// Call api xóa phòng page Admin quản lý thông tin phòng
export const deleteRoomApi = (id: number, token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/phong-thue/${id}`,
        method: "DELETE",
        headers: {
          token: token,
          tokenCybersoft: TOKEN_CYBERSOFT,
        },
      });
      console.log({ result });
      // let action = setRoomList(result.data.content);
      dispatch(getRoomALLApi());
    } catch (error) {
      console.log({ error });
    }
  };
};
//Call api  Đặt phòng theo người dùng => page profile
export const getDatphongApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(
        `/dat-phong/lay-theo-nguoi-dung/${getStoreJSON(USER_LOGIN).user.id}`
      );
      let action = setBookRoom(result.data.content);
      dispatch(action);
      console.log("getDatPhonng:", result);
    } catch (error) {
      console.log({ error });
    }
  };
};
// Call api lấy thông tin của room => page profile
export const getRoomProfileAPI = (id: number | undefined) => {
  return async (dispatch: AppDispatch) => {
    try {
      console.log("id:", { id });
      let result = await http.get(`/phong-thue/${id}`);
      let action = setRoomPofile(result.data.content);
      dispatch(action);
      console.log(result.data.content);
    } catch (error) {
      console.log({ error });
    }
  };
};

// call api create Room
export const postRoomApi = (token: string, data: Room) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await axios({
        url: "https://airbnbnew.cybersoft.edu.vn/api/phong-thue",
        method: "POST",
        data: data,
        headers: {
          tokenCybersoft: TOKEN_CYBERSOFT,
          token: token,
        },
      });
      console.log({ result });
      alert(result.data.message);
      // goi
      dispatch(getRoomALLApi());
    } catch (error) {
      console.log({ error });
    }
  };
};

// Call search api room
export const searchRoomApi = (token: string, data: Room) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await axios({
        url: "https://airbnbnew.cybersoft.edu.vn/api/phong-thue",
        method: "POST",
        data: data,
        headers: {
          tokenCybersoft: TOKEN_CYBERSOFT,
          token: token,
        },
      });
      console.log({ result });
      alert(result.data.message);
      // goi
      dispatch(getRoomALLApi());
    } catch (error) {
      console.log({ error });
    }
  };
};
//Call api Search page Quản lý phòng
export const searchRoomAdminApi = (
  search: string | number | undefined,
  page: number,
  pageSize: number
) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(
        `/phong-thue/phan-trang-tim-kiem?pageIndex=${page}&pageSize=${pageSize}&keyword=${search}`
      );
      console.log({ result });
      // đưa lên redux (setRoomList)
      let action = setArrRoomPage(result.data.content.data);
      dispatch(action);
    } catch (error) {
      console.log({ error });
    }
  };
};
// -------------- page admin dat phòng-----------

export const getBookRoomAdminApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(`/dat-phong`);
      // đưa lên redux
      dispatch(setBookRoom(result.data.content));
      console.log({ result });
    } catch (error) {
      console.log({ error });
    }
  };
};
// Call delete bookRoom
export const deleteBookRoomAdminApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.delete(`/dat-phong/${id}`);
      // đưa lên redux
      message.success(result.data.message);

      dispatch(getBookRoomAdminApi());
      console.log({ result });
    } catch (error) {
      console.log({ error });
    }
  };
};
