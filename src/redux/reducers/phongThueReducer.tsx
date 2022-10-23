import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, RootState } from '../configStore';
import { http } from '../../util/setting';

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
  ngayDen: Date;
  ngayDi: Date;
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
};

const phongThueReducer = createSlice({
  name: 'phongThueReducer',
  initialState,
  reducers: {
    getRoomDetail: (state, action: PayloadAction<Room>) => {
      state.room = [...state.room, action.payload];
    },
    amountGuest: (state, action: PayloadAction<{ value: boolean; text: string }>) => {
      let value1 = action.payload.value;
      let value2 = action.payload.text;
      let [roomDetail] = [...state.room];

      if (value1) {
        switch (value2) {
          case 'nguoiLon':
            if (state.guestNumber.nguoiLon < roomDetail.khach - state.guestNumber.treEm) {
              state.guestNumber.nguoiLon += 1;
            }
            break;
          case 'treEm':
            if (state.guestNumber.treEm < roomDetail.khach - state.guestNumber.nguoiLon) {
              state.guestNumber.treEm += 1;
            }
            break;
          case 'emBe':
            state.guestNumber.emBe += 1;
            break;
          case 'thuCung':
            state.guestNumber.thuCung += 1;
            break;
        }
      } else {
        if (value2 == 'nguoiLon' && state.guestNumber.nguoiLon >= 2) {
          state.guestNumber.nguoiLon -= 1;
        }
        if (value2 == 'treEm' && state.guestNumber.treEm >= 1) {
          state.guestNumber.treEm -= 1;
        }
        if (value2 == 'emBe' && state.guestNumber.emBe >= 1) {
          state.guestNumber.emBe -= 1;
        }
        if (value2 == 'thuCung' && state.guestNumber.thuCung >= 1) {
          state.guestNumber.thuCung -= 1;
        }
      }
    },
    filterRoomBooked: (state, action: PayloadAction<BookRoom[]>) => {
      state.arrBookRoom = action.payload;

      console.log(state.arrBookRoom);

      let [roomDetail] = [...state.room];

      let arrBooked = state.arrBookRoom.filter((item: BookRoom) => item.maPhong == roomDetail?.id);
      // state.arrBookRoom = arrBooked;

      // console.log(arrBooked);
    },
  },
});

export const { getRoomDetail, amountGuest, filterRoomBooked } = phongThueReducer.actions;

export default phongThueReducer.reducer;

//----------------api--------------------------
export const getRoomDetailApi = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      //   const result = await http.get('/phong-thue/1');
      const result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/phong-thue/${id}`,
        method: 'GET',
        headers: {
          tokenCybersoft:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyOCIsIkhldEhhblN0cmluZyI6IjI1LzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NzI4MzIwMDAwMCIsIm5iZiI6MTY0Nzk2ODQwMCwiZXhwIjoxNjc3NDMwODAwfQ.wEdmkKpVZbDB4s4L_cmLwJ1O8le8Cc-VMgLZCI-HvLA',
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
        url: 'https://airbnbnew.cybersoft.edu.vn/api/dat-phong',
        method: 'GET',
        headers: {
          tokenCybersoft:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyOCIsIkhldEhhblN0cmluZyI6IjI1LzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NzI4MzIwMDAwMCIsIm5iZiI6MTY0Nzk2ODQwMCwiZXhwIjoxNjc3NDMwODAwfQ.wEdmkKpVZbDB4s4L_cmLwJ1O8le8Cc-VMgLZCI-HvLA',
        },
      });
      const action = filterRoomBooked(result.data.content);
      dispatch(action);
      // console.log(result.data.content);
    } catch (err) {
      console.log(err);
    }
  };
};

export const postBookRoomApi = (room: BookRoom) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await axios({
        url: 'https://airbnbnew.cybersoft.edu.vn/api/dat-phong',
        method: 'POST',
        data: room,
        headers: {
          tokenCybersoft:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyOCIsIkhldEhhblN0cmluZyI6IjI1LzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NzI4MzIwMDAwMCIsIm5iZiI6MTY0Nzk2ODQwMCwiZXhwIjoxNjc3NDMwODAwfQ.wEdmkKpVZbDB4s4L_cmLwJ1O8le8Cc-VMgLZCI-HvLA',
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// export const handleDate = (data: BookRoom) =>{
//   let booked = data.filter((item)=>{

//   })
// }
