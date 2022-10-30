import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '../configStore';

export interface Guest {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: number;
  birthday: string;
  avatar: string;
  gender: boolean;
  role: string;
}

export interface GuestState {
  arrGuest: Guest[];
}

const initialState: GuestState = {
  arrGuest: [],
};

const guestDetailReducer = createSlice({
  name: 'guestDetailReducer',
  initialState,
  reducers: {
    getGuestDetail: (state, action: PayloadAction<Guest[]>) => {
      state.arrGuest = action.payload;
    },
  },
});

export const { getGuestDetail } = guestDetailReducer.actions;

export default guestDetailReducer.reducer;

//--------------api----------------
export const getGuestDetailApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/users`,
        method: 'GET',
        headers: {
          tokenCybersoft:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyOCIsIkhldEhhblN0cmluZyI6IjI1LzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NzI4MzIwMDAwMCIsIm5iZiI6MTY0Nzk2ODQwMCwiZXhwIjoxNjc3NDMwODAwfQ.wEdmkKpVZbDB4s4L_cmLwJ1O8le8Cc-VMgLZCI-HvLA',
        },
      });
      const action = getGuestDetail(result.data.content);
      dispatch(action);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
};
