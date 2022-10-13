import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/configStore";
import { postSignupUser } from "../../redux/reducers/userReducer";
import * as Yup from "yup";
import { string } from "yup/lib/locale";
import { NavLink } from "react-router-dom";
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
  passwordConfirm: string;
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
    passwordConfirm: "",
  };
  const registerSchema = Yup.object().shape({
    password: Yup.string()
      .required("Không được bỏ trống!")
      .min(6, "Password nhiều hơn 6 ký tự!"),
    passwordConfirm: Yup.string()
      .required("Không được bỏ trống!")
      .min(6, "Password nhiều hơn 6 ký tự!"),
    email: Yup.string()
      .required("Không được bỏ trống!")
      .email("Email không hợp lệ"),
    name: Yup.string().required("Không được bỏ trống!"),
    phone: Yup.string()
      .length(10, "Nhập lại số điện thoại !")
      .required("Không được bỏ trống!"),
  });
  return (
    <div className="register">
      <div className="container">
        <h3>ĐĂNG KÝ</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={(values) => {
            console.log({ values });

            let { password, passwordConfirm } = values;
            console.log({ password, passwordConfirm });
            if (password !== passwordConfirm) {
              alert(
                "Nhập lại mật khẩu không đúng với mật khẩu! Vui lòng nhập lại."
              );
              return;
            } else {
              const aciton = postSignupUser(values);
              dispatch(aciton);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <p>Họ tên</p>
                <Field
                  className="form-control"
                  type="text"
                  name="name"
                  id="name"
                />
                {errors.name && touched.name ? <p>{errors.name}</p> : null}
              </div>
              <div className="form-group">
                <p>Email</p>
                <Field
                  className="form-control"
                  type="email"
                  name="email"
                  id="email"
                />
                {errors.email && touched.email ? <p>{errors.email}</p> : null}
              </div>
              <div className="form-group">
                <p>Mật khẩu</p>
                <Field
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                />
                {errors.password && touched.password ? (
                  <p>{errors.password}</p>
                ) : null}
              </div>
              <div className="form-group">
                <p>Nhập lại mật khẩu</p>
                <Field
                  className="form-control"
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                />
                {errors.passwordConfirm && touched.passwordConfirm ? (
                  <p id="err">{errors.passwordConfirm}</p>
                ) : null}
              </div>

              <div className="form-group">
                <p>Số điện thoại</p>
                <Field
                  className="form-control"
                  type="text"
                  name="phone"
                  id="phone"
                />
                {errors.phone && touched.phone ? <p>{errors.phone}</p> : null}
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
                <NavLink
                  to="/login"
                  type="button"
                  className="mx-2 btn btn-primary"
                >
                  Đăng nhập
                </NavLink>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
