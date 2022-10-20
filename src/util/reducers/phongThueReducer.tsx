import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '../../redux/configStore';
import { http } from '../setting';

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

const initialState = {
  room: {},
};

const phongThueReducer = createSlice({
  name: 'phongThueReducer',
  initialState,
  reducers: {
    getRoomDetail: (state, action: PayloadAction<Room>) => {
      state.room = action.payload;
    },
  },
});

export const {} = phongThueReducer.actions;

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
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
};
