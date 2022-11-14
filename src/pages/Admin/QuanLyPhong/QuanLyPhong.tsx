import { Pagination, PaginationProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateRoom from '../../../components/Admin/CreateRoom/CreateRoom';
import HocModal from '../../../HOC/HocModal';
import { AppDispatch, RootState } from '../../../redux/configStore';
import { getLocationAPI } from '../../../redux/reducers/locationDetailReducer';
import { setModalAction } from '../../../redux/reducers/modalReducer';
import {
  deleteRoomApi,
  getRoomALLApi,
  getRoomPageApi,
  searchRoomAdminApi,
} from '../../../redux/reducers/roomDetailReducer';

import { ACCESS_TOKEN, getStore, getStoreJSON, USER_LOGIN } from '../../../util/setting';
import UpdataPhong from './UpdataPhong';

type Props = {};
let timeout: any = null;

export default function QuanLyPhong({}: Props) {
  const { room, arrRoomPage } = useSelector((state: RootState) => state.roomDetailReducer);
  const arrLocation = useSelector((state: RootState) => state.locationDetailReducer.viTri);
  const { user, token } = useSelector((state: RootState) => state.userReducer.userLogin);
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const [search, setSearch] = useState<string | number | undefined>('');

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    let action = getRoomPageApi(page, pageSize);
    dispatch(action);
    let action2 = getLocationAPI();
    dispatch(action2);
  }, [page]);
  useEffect(() => {
    let action = getRoomALLApi();
    dispatch(action);
    let action2 = getLocationAPI();
    dispatch(action2);
  }, []);

  useEffect(() => {
    timeout = setTimeout(() => {
      let action = searchRoomAdminApi(search, page, pageSize);
      dispatch(action);
    }, 1000);
    return () => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };
  }, [search]);
  const renderRoomList = () => {
    return arrRoomPage?.map((item, index) => {
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
            <button className="btn btn-info mx-2" data-bs-toggle="modal" data-bs-target="#modalId" onClick={() => {}}>
              Sửa
            </button>
            <div
              className="modal fade"
              id="modalId"
              tabIndex={-1}
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              role="dialog"
              aria-labelledby="modalTitleId"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="modalTitleId">
                      Modal title
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                  </div>
                  <div className="modal-body">Body</div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => {
                if (!token) {
                  return;
                }
                let actionDelete = deleteRoomApi(item.id, token);
                dispatch(actionDelete);
              }}
            >
              X
            </button>
          </td>
        </tr>
      );
    });
  };
  const renderViTri = (id: number) => {
    let index = arrLocation.findIndex((item, index) => item.id == id);
    return arrLocation[index]?.tinhThanh;
  };

  const onChange: PaginationProps['onChange'] = (page) => {
    setPage(page);
  };
  return (
    <>
      <HocModal />
      <div className="container thongTinPhong">
        <div className="row py-3">
          <button
            className="btn btn-danger col-3 add"
            data-bs-toggle="modal"
            data-bs-target={'#modal'}
            onClick={() => {
              const action = setModalAction({
                Component: CreateRoom,
                title: 'Create Room',
              });
              dispatch(action);
            }}
          >
            Thêm Phòng
          </button>
          <div className="form-group d-flex col-9">
            <input
              type="text"
              name="search"
              id="search"
              className="form-control"
              placeholder="Nhập vào tên phòng"
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
            <button
              className="btn btn-success mx-2 px-4"
              onClick={() => {
                // let action =
                // dis
              }}
            >
              Tìm
            </button>
          </div>
        </div>
        <div>
          <table className="table text-center">
            <thead className="table-dark">
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
          <div>
            <Pagination
              className="admin_location-page"
              current={page}
              defaultPageSize={4}
              onChange={onChange}
              total={search == '' ? room.length : arrRoomPage.length}
            />
          </div>
        </div>
      </div>
    </>
  );
}
