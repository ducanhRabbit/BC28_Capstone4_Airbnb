import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/configStore";
import { postSignupUser } from "../../redux/reducers/userReducer";

type Props = {};
export interface userRegister {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
}
export default function Register({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const initialValues: userRegister = {
    id: 0,
    email: "",
    password: "",
    phone: "",
    birthday: "",
    gender: true,
    role: "",
    name: "",
  };
  return (
    <div className="register">
      <div className="container">
        <h3>ĐĂNG KÝ</h3>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log({ values });
            let newUser: userRegister = {
              id: 0,
              email: values.email,
              password: values.password,
              name: values.name,
              phone: values.phone,
              gender: values.gender,
              role: "",
              birthday: "",
            };
            const aciton = postSignupUser(newUser);
            dispatch(aciton);
          }}
        >
          <Form>
            <div className="form-group">
              <p>Tài khoản</p>
              <Field
                className="form-control"
                type="text"
                name="taiKhoan"
                id="taiKhoan"
              />
            </div>
            <div className="form-group">
              <p>Mật khẩu</p>
              <Field
                className="form-control"
                type="password"
                name="password"
                id="password"
              />
            </div>
            <div className="form-group">
              <p>Nhập lại mật khẩu</p>
              <Field
                className="form-control"
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
              />
            </div>
            <div className="form-group">
              <p>Họ tên</p>
              <Field
                className="form-control"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="form-group">
              <p>Email</p>
              <Field
                className="form-control"
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="form-group">
              <p>Số điện thoại</p>
              <Field
                className="form-control"
                type="text"
                name="phone"
                id="phone"
              />
            </div>
            <div className=" form-group row mt-2">
              <p className="col-4">Giới tính: </p>
              <div className="col-4 row">
                <div className=" col-6 text-center">
                  <Field type="radio" name="gender" value="true" checked />
                  <p>Nam</p>
                </div>
                <div className=" col-6 text-center">
                  <Field type="radio" name="gender" value="false" />
                  <p>Nữ</p>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <button type="submit" className="btn btn-success">
                Đăng ký
              </button>
              <button type="button" className="mx-2 btn btn-primary">
                Đăng nhập
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      {/* <form className="container" onSubmit={formik.handleSubmit}>
        <h3>ĐĂNG KÝ</h3>
        <div className="form-group">
          <p>Tài khoản</p>
          <input
            className="form-control"
            type="text"
            name="taiKhoan"
            id="taiKhoan"
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <p>Mật khẩu</p>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <p>Nhập lại mật khẩu</p>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
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
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <p>Số điện thoại</p>
          <input className="form-control" type="text" name="phone" id="phone" />
        </div>
        <div className=" form-group row mt-2">
          <p className="col-4">Giới tính: </p>
          <div className="col-4 row">
            <div className=" col-6 text-center">
              <input
                type="radio"
                name="gender"
                value="true"
                checked
                onChange={formik.handleChange}
              />
              <p>Nam</p>
            </div>
            <div className=" col-6 text-center">
              <input
                type="radio"
                name="gender"
                value="false"
                onChange={formik.handleChange}
              />
              <p>Nữ</p>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <button type="submit" className="btn btn-success">
            Đăng ký
          </button>
          <button type="button" className="mx-2 btn btn-primary">
            Đăng nhập
          </button>
        </div>
      </form> */}
    </div>
  );
}
