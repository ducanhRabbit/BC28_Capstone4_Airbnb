import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';

import 'antd/dist/antd.css';
import { getLocationAPI, getLocationPageApi } from '../../redux/reducers/locationReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/configStore';
import ModalAdminLocation from './ModalAdminLocation';

type Props = {};

export default function AdminLocation({}: Props) {
  const { arrLocation, arrPageLocation } = useSelector((state: RootState) => state.locationReducer);
  console.log(arrLocation);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(4);

  const dispatch: AppDispatch = useDispatch();

  const onChange: PaginationProps['onChange'] = (page) => {
    setPage(page);
  };

  const renderTable = () => {
    return arrPageLocation.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{item?.id}</th>
          <td>{item?.tenViTri}</td>
          <td>{item?.tinhThanh}</td>
          <td>{item?.quocGia}</td>
          <td className="admin_location-table-tdImg">
            <img className="admin_location-table-img" src={item?.hinhAnh} alt="img" />
          </td>
          <td>
            <button className="admin_location-btn">
              <i className="fas fa-trash-alt"></i>
            </button>

            <button className="admin_location-btn btn_update">
              <i className="fas fa-pencil-alt"></i>
            </button>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    const action = getLocationPageApi(page, pageSize);
    dispatch(action);
  }, [page]);

  useEffect(() => {
    const action1 = getLocationAPI();
    dispatch(action1);
  }, []);

  return (
    <div className="admin_location">
      <div className="container admin_location-layout">
        <div>
          <span className="admin_location-title" data-bs-toggle="modal" data-bs-target="#adminLocationModal">
            Thêm vị trí
          </span>
          <ModalAdminLocation />
        </div>
        <div className="mt-3">
          <table className="table table-bordered align-middle admin_location-table">
            <thead className="table-dark">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Tên vị trí</th>
                <th scope="col">Tỉnh thành</th>
                <th scope="col">Quốc gia</th>
                <th scope="col">Hình ảnh</th>
                <th className="admin_location-table-th">Action</th>
              </tr>
            </thead>
            <tbody>{renderTable()}</tbody>
          </table>
          <div>
            <Pagination
              className="admin_location-page"
              current={page}
              defaultPageSize={4}
              onChange={onChange}
              total={arrLocation.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
