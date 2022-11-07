import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/configStore";
// import { getLocationAPI } from "../../../redux/reducers/locationReducer";
import { getRoomApi } from "../../../redux/reducers/roomReducer";

type Props = {};

export default function QuanLyThongTinPhong({}: Props) {
  const listRoom = useSelector(
    (state: RootState) => state.roomReducer.listRoom
  );
  const arrLocation = useSelector(
    (state: RootState) => state.locationReducer.arrLocation
  );
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    let action = getRoomApi();
    dispatch(action);
    let action2 = getLocationAPI();
    dispatch(action2);
  }, []);

  const renderRoomList = () => {
    return listRoom?.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.tenPhong}</td>
          <td>
            <img src={item.hinhAnh} alt="hinh Ảnh" />
          </td>
          {/* có mã vị trí call api => tỉnh thành từ api('/vi-tri/${mã vị trí}) */}
          <td>{renderViTri(item?.maViTri)}</td>
          <td>{item.khach}</td>
          <td>
            <button className="btn btn-dark">Xem</button>
            <button className="btn btn-info mx-2">Sửa</button>
            <button className="btn btn-danger">X</button>
          </td>
        </tr>
      );
    });
  };
  const renderViTri = (id: number) => {
    let index = arrLocation.findIndex((item, index) => item.id == id);
    return arrLocation[index]?.tinhThanh;
  };

  return (
    <div className="container thongTinPhong">
      <h3>Thêm Phòng</h3>
      <div className="form-group d-flex">
        <input
          type="text"
          name="search"
          id="search"
          className="form-control"
          placeholder="Nhập vào tên phòng"
        />
        <button className="btn btn-success mx-2 px-4">Tìm</button>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Mã phòng</th>
              <th>Tên phòng</th>
              <th>Hình ảnh</th>
              <th>Địa điểm</th>
              <th>Số lượng tối đa</th>
              <th colSpan={4}>Chức năng</th>
            </tr>
          </thead>
          <tbody>{renderRoomList()}</tbody>
        </table>
      </div>
    </div>
  );
}
