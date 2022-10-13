import React from "react";
import { NavLink } from "react-router-dom";

type Props = {};

export default function Profile({}: Props) {
  return (
    <div className="profilr">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div className="card">
              <img
                src="https://a0.muscache.com/im/pictures/user/bed9f323-9a58-4d98-99ed-c235a40744bd.jpg?aki_policy=profile_large"
                alt=""
              />
              <a href="#">Cập nhập ảnh</a>
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
              >
                <path d="M16 .798l.555.37C20.398 3.73 24.208 5 28 5h1v12.5C29 25.574 23.21 31 16 31S3 25.574 3 17.5V5h1c3.792 0 7.602-1.27 11.445-3.832L16 .798zm0 2.394l-.337.213C12.245 5.52 8.805 6.706 5.352 6.952L5 6.972V17.5c0 6.831 4.716 11.357 10.713 11.497L16 29c6.133 0 11-4.56 11-11.5V6.972l-.352-.02c-3.453-.246-6.893-1.432-10.311-3.547L16 3.192zm7 7.394L24.414 12 13.5 22.914 7.586 17 9 15.586l4.5 4.499 9.5-9.5z"></path>
              </svg>
              <h4>Xác minh danh tinh</h4>
              <p>Xác thực danh tính của bạn với huy hiệu xác minh danh tính</p>
              <button>Nhận huy hiệu</button>
              <div>
                <hr />
              </div>
              <h3>Name đã xác nhận </h3>
              <span>Địa chỉ email</span>
            </div>
          </div>
          <div className="col-9">
            <h1>Xin Chào, tôi là Name</h1>
            <p>Bắt đầu tham gia vào 2022</p>
            <a href="#">Chỉnh sửa hồ sơ</a>
            <div>
              <i className="fas fa-star    "></i> 0 đánh giá
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
