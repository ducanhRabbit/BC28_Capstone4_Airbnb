import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/setting";
import { AppDispatch } from "../configStore";

export interface RoomInfo {
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

export interface RoomState {
  listRoom: RoomInfo[];
}

const initialState: RoomState = {
  listRoom: [],
};

const roomReducer = createSlice({
  name: "roomReducer",
  initialState,
  reducers: {
    setRoomList: (state, action) => {
      state.listRoom = action.payload;
    },
  },
});

export const { setRoomList } = roomReducer.actions;

export default roomReducer.reducer;

//  --------------Call API----------------

export const getRoomListByLocation = (locationId: string | undefined) => {
  return async (dispatch: AppDispatch, getState: any) => {
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
export const getRoomApi = () => {
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
