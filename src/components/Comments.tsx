import React, { useState, createElement, useEffect } from 'react';
import { Avatar, Comment, Tooltip } from 'antd';
import { Rate } from 'antd';
import moment from 'moment';
import { filterComment, getAllCommentApi, postCommentApi } from '../redux/reducers/commentReducer';
import { AppDispatch, RootState } from '../redux/configStore';
import { useDispatch, useSelector } from 'react-redux';
import { Room } from '../redux/reducers/phongThueReducer';
import { getGuestDetailApi } from '../redux/reducers/guestDetailReducer';
import { Button, message } from 'antd';

type Props = {
  roomDetail: Room;
};

export default function Comments({ roomDetail }: Props) {
  const { arrComment, arrCommentId } = useSelector((state: RootState) => state.commentReducer);
  const { arrGuest } = useSelector((state: RootState) => state.guestDetailReducer);
  const [state, setState] = useState('');
  const [rate, setRate] = useState(5);

  const dispatch: AppDispatch = useDispatch();

  const filterUerComment = (id: number) => {
    let arr = arrGuest.filter((user) => user.id == id);

    return arr[0];
  };

  const renderComment = () => {
    return arrCommentId.map((comment, index) => {
      if (comment.noiDung != '' && comment.ngayBinhLuan.toString() != '') {
        let test = comment.ngayBinhLuan.toString();

        let guestComment = filterUerComment(comment?.maNguoiBinhLuan);

        return (
          <div className="col-6" key={index}>
            <Comment
              className="detail_comment-item"
              author={<a className="detail_comment-item-name">{guestComment?.name}</a>}
              avatar={<Avatar src={`https://i.pravatar.cc?u=${comment?.id}`} alt="avatar" />}
              content={<p className="detail_comment-item-text">{comment?.noiDung}</p>}
              datetime={
                <Tooltip title={test}>
                  <span>{test}</span>
                </Tooltip>
              }
            />
          </div>
        );
      }
    });
  };

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setState(value);
  };

  const handleSubmitComment = () => {
    let userCommentApi = {
      id: 456,
      maPhong: roomDetail?.id,
      maNguoiBinhLuan: 1210,
      ngayBinhLuan: moment().format('DD-MM-YYYY'),
      noiDung: state,
      saoBinhLuan: rate,
    };
    if (state != '') {
      const action = postCommentApi(userCommentApi);
      dispatch(action);
      setState('');
    }
  };

  useEffect(() => {
    const action = getAllCommentApi(roomDetail?.id);
    dispatch(action);
  }, [roomDetail?.id]);

  useEffect(() => {
    const action2 = getGuestDetailApi();
    dispatch(action2);
  }, [roomDetail?.id]);

  useEffect(() => {
    const action3 = filterComment(roomDetail?.id);
    dispatch(action3);
  }, [roomDetail?.id]);

  return (
    <div className="detail_comment row" id="detailComment">
      <div className="detail_comment-rate">
        <Rate className="detail_rate-star" allowHalf defaultValue={4.8} disabled />
        <span className="ms-2 rate_title">4,80</span>
        <li className="ms-3 rate_title">{arrCommentId.length} đánh giá</li>
      </div>
      <div className="col-6">
        <div className="detail_comment-process">
          <div className="detail_comment-process-item">
            <p className="m-0 process-text">Mức độ sạch sẽ</p>
            <div className="progress process-item">
              <div
                className="progress-bar process-item-bar"
                role="progressbar"
                aria-label="Basic example"
                style={{ width: '95%' }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>

          <div className="detail_comment-process-item">
            <p className="m-0 process-text">Giao tiếp</p>
            <div className="progress process-item">
              <div
                className="progress-bar process-item-bar"
                role="progressbar"
                aria-label="Basic example"
                style={{ width: '100%' }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>

          <div className="detail_comment-process-item">
            <p className="m-0 process-text">Nhận phòng</p>
            <div className="progress process-item">
              <div
                className="progress-bar process-item-bar"
                role="progressbar"
                aria-label="Basic example"
                style={{ width: '80%' }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-6">
        <div className="detail_comment-process">
          <div className="detail_comment-process-item">
            <p className="m-0 process-text">Độ chính xác</p>
            <div className="progress process-item">
              <div
                className="progress-bar process-item-bar"
                role="progressbar"
                aria-label="Basic example"
                style={{ width: '95%' }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>

          <div className="detail_comment-process-item">
            <p className="m-0 process-text">Vị trí</p>
            <div className="progress process-item">
              <div
                className="progress-bar process-item-bar"
                role="progressbar"
                aria-label="Basic example"
                style={{ width: '100%' }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>

          <div className="detail_comment-process-item">
            <p className="m-0 process-text">Giá trị</p>
            <div className="progress process-item">
              <div
                className="progress-bar process-item-bar"
                role="progressbar"
                aria-label="Basic example"
                style={{ width: '80%' }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">{renderComment()}</div>

      <div className="detail_comment-write">
        <div className="detail_comment-write-rate">
          <span className="rate_text">Chất lượng phòng</span>
          <Rate className="detail_rate-star rate_star" defaultValue={rate} onChange={(value) => setRate(value)} />
        </div>

        <div className="d-flex">
          <div className="detail_comment-write-img">
            <img src="https://i.pravatar.cc/40" alt="host" />
          </div>
          <div className="detail_comment-write-input">
            <div className="comment_content">
              <textarea
                value={state}
                className="comment_textarea"
                name="comment"
                id="content"
                cols={30}
                rows={10}
                onChange={handleChangeComment}
              ></textarea>
            </div>
            <div className="comment_btn">
              <button onClick={handleSubmitComment} className="detail_book-body-btnSubmit comment_btn-submit">
                Bình luận
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
