import { act } from "@testing-library/react";
import { type } from "@testing-library/user-event/dist/type";
import { Action } from "history";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import UpdateProfile "../../HOC/HocModalnts/UpdateProfile/UpdateProfile";
import HocModal from "../../HOC/HocModal";

import { AppDispatch, RootState } from "../../redux/configStore";
import { setModalAction } from "../../redux/reducers/modalReducer";
import {
  getDatphongApi,
  getUserAPi,
  userLoginState,
} from "../../redux/reducers/userReducer";
import { getStoreJSON, USER_LOGIN } from "../../util/setting";

type Props = {};

export default function Profile({}: Props) {
  let userLogin = useSelector(
    (state: RootState) => state.userReducer.userLogin
  );
  console.log({ userLogin });
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    let action = getUserAPi();
    dispatch(action);
    let action2 = getDatphongApi();
    dispatch(action2);
  }, []);
  return (
    <>
      <HocModal />
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="card">
                <div className="card_img">
                  <img src={userLogin?.avatar} alt="" />
                  <a href="#">Cập nhập ảnh</a>
                </div>
                <div>
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                  >
                    <path d="M16 .798l.555.37C20.398 3.73 24.208 5 28 5h1v12.5C29 25.574 23.21 31 16 31S3 25.574 3 17.5V5h1c3.792 0 7.602-1.27 11.445-3.832L16 .798zm0 2.394l-.337.213C12.245 5.52 8.805 6.706 5.352 6.952L5 6.972V17.5c0 6.831 4.716 11.357 10.713 11.497L16 29c6.133 0 11-4.56 11-11.5V6.972l-.352-.02c-3.453-.246-6.893-1.432-10.311-3.547L16 3.192zm7 7.394L24.414 12 13.5 22.914 7.586 17 9 15.586l4.5 4.499 9.5-9.5z"></path>
                  </svg>
                  <h4>Xác minh danh tính</h4>
                  <p>
                    Xác thực danh tính của bạn với huy hiệu xác minh danh tính
                  </p>
                  <button>Nhận huy hiệu</button>
                </div>
                <div>
                  <hr />
                </div>
                <h3>{userLogin?.name} đã xác nhận </h3>
                <div className="card-bt">
                  <i className="fa fa-check"></i>
                  <span>Địa chỉ email</span>
                </div>
              </div>
            </div>
            <div className="col-8">
              <h1>Xin Chào, tôi là {userLogin?.name}</h1>
              <p>Bắt đầu tham gia vào 2022</p>
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target={"#modal"}
                onClick={() => {
                  console.log("123");
                  const action = setModalAction({
                    Component: UpdateProfile,
                    title: "Update Profile",
                  });
                  dispatch(action);
                }}
              >
                Chỉnh sửa hồ sơ
              </a>
              <div className="my-2">
                <p>Phòng đã thuê</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
