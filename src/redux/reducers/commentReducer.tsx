import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from 'antd';
import axios from 'axios';
import { http } from '../../util/setting';
import { AppDispatch, RootState } from '../configStore';
import { getRoomDetail } from './phongThueReducer';

export interface Comment {
  id: number;
  maPhong: number;
  maNguoiBinhLuan: number;
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
}

export interface CommentState {
  arrComment: Comment[];
  arrCommentId: Comment[];
}

const initialState: CommentState = {
  arrComment: [],
  arrCommentId: [],
};

const commentReducer = createSlice({
  name: 'commentReducer',
  initialState,
  reducers: {
    getAllComment: (state, action) => {
      state.arrComment = action.payload;
    },
    addComment: (state, action) => {
      let userComment = action.payload;
      state.arrCommentId.push(userComment);
    },
    filterComment: (state, action) => {
      state.arrCommentId = state.arrComment.filter((comment) => comment.maPhong == action.payload);
    },
  },
});

export const { getAllComment, addComment, filterComment } = commentReducer.actions;

export default commentReducer.reducer;

//--------------------api---------------------------
export const getAllCommentApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      //   const result = await http.get('/binh-luan');
      const result = await axios({
        url: 'https://airbnbnew.cybersoft.edu.vn/api/binh-luan',
        method: 'GET',
        headers: {
          tokenCybersoft:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyOCIsIkhldEhhblN0cmluZyI6IjI1LzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NzI4MzIwMDAwMCIsIm5iZiI6MTY0Nzk2ODQwMCwiZXhwIjoxNjc3NDMwODAwfQ.wEdmkKpVZbDB4s4L_cmLwJ1O8le8Cc-VMgLZCI-HvLA',
        },
      });
      const action = getAllComment(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const postCommentApi = (comment: Comment) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await axios({
        url: 'https://airbnbnew.cybersoft.edu.vn/api/binh-luan',
        method: 'POST',
        data: comment,
        headers: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMTAiLCJlbWFpbCI6ImFAMTJnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsIm5iZiI6MTY2NjY4MzI5OSwiZXhwIjoxNjY3Mjg4MDk5fQ.JKRutikAMDb83B8HA4faXI11hGNmla7h_ZsXSliosQQ',
          tokenCybersoft:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyOCIsIkhldEhhblN0cmluZyI6IjI1LzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NzI4MzIwMDAwMCIsIm5iZiI6MTY0Nzk2ODQwMCwiZXhwIjoxNjc3NDMwODAwfQ.wEdmkKpVZbDB4s4L_cmLwJ1O8le8Cc-VMgLZCI-HvLA',
        },
      });
      const action = addComment(result.data.content);

      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};
