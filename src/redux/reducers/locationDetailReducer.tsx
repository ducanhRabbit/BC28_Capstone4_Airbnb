import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { http } from '../../util/setting';
import { AppDispatch } from '../configStore';

export interface ViTri {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
}

export interface ViTriState {
  viTri: ViTri[];
  arrPageLocation: ViTri[];
}

const initialState: ViTriState = {
  viTri: [],
  arrPageLocation: [],
};

const vitriDetailReducer = createSlice({
  name: 'locationDetailReducer',
  initialState,
  reducers: {
    getLocationDetail: (state, action) => {
      state.viTri = [...state.viTri, action.payload];
    },
    setArrLocation: (state, action) => {
      state.viTri = action.payload;
    },
    setArrPageLocation: (state: any, action: any) => {
      state.arrPageLocation = action.payload;
    },
  },
});

export const { getLocationDetail, setArrLocation, setArrPageLocation } = vitriDetailReducer.actions;

export default vitriDetailReducer.reducer;

//-----------------api---------------------
export const getLocationDetailApi = (maVitri: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      // const result = await http.get(`/vi-tri/${maVitri}`);
      const result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/vi-tri/${maVitri}`,
        method: 'GET',
        headers: {
          tokenCybersoft:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyOCIsIkhldEhhblN0cmluZyI6IjI1LzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NzI4MzIwMDAwMCIsIm5iZiI6MTY0Nzk2ODQwMCwiZXhwIjoxNjc3NDMwODAwfQ.wEdmkKpVZbDB4s4L_cmLwJ1O8le8Cc-VMgLZCI-HvLA',
        },
      });
      console.log(result);
      const action = getLocationDetail(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const getLocationAPI = () => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get('/vi-tri');
      const action = setArrLocation(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const getLocationPageApi = (page: number, pageSize: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(`/vi-tri/phan-trang-tim-kiem?pageIndex=${page}&pageSize=${pageSize}`);
      // console.log(result);

      const action = setArrPageLocation(result.data.content.data);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const postLocationAdminApi = (location: Location) => {
  return async () => {
    try {
      const result = await axios({
        url: 'https://airbnbnew.cybersoft.edu.vn/api/vi-tri',
        method: 'POST',
        data: location,
        headers: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzMTciLCJlbWFpbCI6InNlbjc4OUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJuYmYiOjE2Njc0MDA3MjMsImV4cCI6MTY2ODAwNTUyM30.Id3QH0wh5LIG1VqccHkrsrQT8Tf8Hn2t4CKmOY6Xjzw',
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
