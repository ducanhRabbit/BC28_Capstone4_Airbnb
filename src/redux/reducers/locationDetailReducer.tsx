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
}

const initialState: ViTriState = {
  viTri: [],
};

const vitriDetailReducer = createSlice({
  name: 'locationDetailReducer',
  initialState,
  reducers: {
    getLocationDetail: (state, action) => {
      state.viTri = [...state.viTri, action.payload];
    },
    setArrLocation: (state,action) =>{
      state.viTri = action.payload;        
  }
  },
});

export const { getLocationDetail, setArrLocation } = vitriDetailReducer.actions;

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

export const getLocationAPI = ()=>{
  return async (dispatch:AppDispatch) =>{
    try{
      let result = await http.get('/vi-tri');
      const action = setArrLocation(result.data.content);
      dispatch(action)
    }
    catch(err){
      console.log(err)
    }
  }
}
