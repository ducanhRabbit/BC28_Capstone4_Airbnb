import React from "react";

type Props = {
  // thongTinNguoiDung: {
  //   id: 0;
  //   name: "string";
  //   email: "string";
  //   password: "string";
  //   phone: "string";
  //   birthday: "string";
  //   gender: true;
  //   role: "string";
  // };
};

export default function Loign({}: Props) {
  return (
    <div className="dangki">
      <form className="container">
        <h3>ĐĂNG KÝ</h3>
        <div className="form-group">
          <p>Tài khoản</p>
          <input type="text" name="taiKhoan" id="taiKhoan" />
        </div>
        <div className="form-group">
          <p>Mật khẩu</p>
          <input type="password" name="password" id="password" />
        </div>
        <div className="form-group">
          <p>Nhập lại mật khẩu</p>
          <input type="password" name="password" id="password" />
        </div>
        <div className="form-group">
          <p>Họ tên</p>
          <input type="text" name="name" id="name" />
        </div>
        <div className="form-group">
          <p>Email</p>
          <input type="email" name="email" id="email" />
        </div>
        <div className="form-group">
          <p>Số điện thoại</p>
          <input type="text" name="phone" id="phone" />
        </div>
        <div>
          <button>Đăng ký</button>
          <button>Đăng nhập</button>
        </div>
      </form>
    </div>
  );
}
