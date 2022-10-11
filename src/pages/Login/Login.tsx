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

export interface userLogin {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  birthday?: string;
  gender?: boolean;
  role?: string;
}

export default function Loign({}: Props) {
  // const formik:any = useFormik({
  //   initialValues {
  //     taiKhoan:,
  //     password,
  //     email,
  //     name,
  //     phone,
  //   },
  // });
  return (
    <div className="login">
      <form className="container">
        <h3>ĐĂNG KÝ</h3>
        <div className="form-group">
          <p>Tài khoản</p>
          <input
            className="form-control"
            type="text"
            name="taiKhoan"
            id="taiKhoan"
          />
        </div>
        <div className="form-group">
          <p>Mật khẩu</p>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="form-group">
          <p>Nhập lại mật khẩu</p>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="form-group">
          <p>Họ tên</p>
          <input className="form-control" type="text" name="name" id="name" />
        </div>
        <div className="form-group">
          <p>Email</p>
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="form-group">
          <p>Số điện thoại</p>
          <input className="form-control" type="text" name="phone" id="phone" />
        </div>
        <div className="mt-2">
          <button className="btn btn-success">Đăng ký</button>
          <button className="mx-2 btn btn-primary">Đăng nhập</button>
        </div>
      </form>
    </div>
  );
}
