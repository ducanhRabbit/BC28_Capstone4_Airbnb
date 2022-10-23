import React, { useEffect } from 'react';
import { NavLink, useLoaderData, useParams } from 'react-router-dom';
import 'antd/dist/antd.css';
import BookRoom from '../../components/BookRoom';
import Comments from '../../components/Comments';
import { getRoomDetailApi } from '../../redux/reducers/phongThueReducer';
import { AppDispatch, RootState } from '../../redux/configStore';
import { useDispatch, useSelector } from 'react-redux';
import { number } from 'yup';
import { useAppSelector } from '../../redux/hooks';
import Convenient from '../../components/Convenient';
import { getLocationDetailApi } from '../../redux/reducers/locationDetailReducer';
import Modal from '../../components/Modal';

type Props = {};

export default function AirbnbDetail({}: Props) {
  const params = useParams();
  let { room } = useAppSelector((state) => state.phongThueReducer);

  let [roomDetail] = [...room];

  let { viTri } = useSelector((state: RootState) => state.locationDetailReducer);
  let [viTriDetail] = [...viTri];

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (params.id) {
      const action = getRoomDetailApi(params.id);
      dispatch(action);
    }
  }, [params.id]);

  useEffect(() => {
    if (roomDetail?.maViTri) {
      const action2 = getLocationDetailApi(roomDetail?.maViTri);
      dispatch(action2);
    }
  }, [roomDetail?.maViTri]);

  let desc = roomDetail?.moTa.split('.\r\n');

  const renderDes = () => {
    return desc?.map((text, index) => {
      let descDetail = text.split('\r\n');

      return (
        <div className="detail_content--des-middle" key={index}>
          <div className="middle_item">
            <i className="fab fa-product-hunt middle_item-icon"></i>
            <div className="middle_item-text">
              <span>{descDetail[0]}</span>
              <p className="middle_item-text-grey">{descDetail[1]}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderRoomDetail = () => {
    return (
      <div>
        <Modal location={viTriDetail} />
        <h2 className="detail_title">{roomDetail?.tenPhong}</h2>
        <div className="detail_rate d-flex">
          <span>
            <i className="fas fa-star detail_rate-star"></i> <span>4,80</span>
          </span>
          <li className="ms-2">
            <a className="detail_rate-note" href="#detailComment">
              222 đánh giá
            </a>
          </li>
          <li className="ms-2">
            <span className="detail_rate-note" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <span>{viTriDetail?.tenViTri}, </span>
              <span>{viTriDetail?.tinhThanh}, </span>
              <span>{viTriDetail?.quocGia}</span>
            </span>
          </li>
        </div>
        <div className="detail_image">
          <img src={roomDetail?.hinhAnh} alt="" />
        </div>
        <div className="detail_content row">
          <div className="col-8">
            <div className="detail_content--des">
              <div className="detail_content--des-top">
                <div className="top_name">
                  <h4 className="top_name-title">Toàn bộ căn hộ. Phòng riêng tại nhà nghỉ dưỡng</h4>
                  <div className="top_name-info">
                    <span>{roomDetail?.khach} khách</span>
                    <li className="ms-2">
                      <span>{roomDetail?.phongNgu} phòng ngủ</span>
                    </li>
                    <li className="ms-2">
                      <span>{roomDetail?.giuong} giường</span>
                    </li>
                    <li className="ms-2">
                      <span>{roomDetail?.phongTam} phòng tắm riêng</span>
                    </li>
                  </div>
                </div>
                <div className="top_imghost">
                  <img src="https://i.pravatar.cc/50" alt="host" />
                </div>
              </div>

              <hr />
              {renderDes()}

              <hr />
              <Convenient item={roomDetail} />
            </div>
          </div>

          <BookRoom roomDetail={roomDetail} />
        </div>
      </div>
    );
  };

  return (
    <div className="detail">
      <div className="container">
        {renderRoomDetail()}

        <hr />
        <Comments />
      </div>
    </div>
  );
}
