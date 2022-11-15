import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { Comment, message } from 'antd';
import axios from 'axios';
import { http } from '../../util/setting';
import { AppDispatch, RootState } from '../configStore';
import { getRoomDetail } from './roomDetailReducer';

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
export const getAllCommentApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get('/binh-luan');
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
      const result = await http.post('/binh-luan', comment);
      message.success('Bình luận thành công!');
      const action = addComment(result.data.content);

      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};
