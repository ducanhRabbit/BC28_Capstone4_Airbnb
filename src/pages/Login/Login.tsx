import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/configStore";
import { postSignin } from "../../redux/reducers/userReducer";
import { http, TOKEN_CYBERSOFT } from "../../util/setting";

type Props = {};

export default function Loign({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };
  const loginSchema = Yup.object().shape({
    password: Yup.string()
      .required("Không được bỏ trống!")
      .min(6, "Password nhiều hơn 6 ký tự!"),
    email: Yup.string()
      .required("Không được bỏ trống!")
      .email("Email không hợp lệ"),
  });
  return (
    <div className="login">
      <div className="container">
        <h3>ĐĂNG NHẬP</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            console.log({ values });
            const action = postSignin(values);
            dispatch(action);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <p>Email</p>
                <Field
                  className="form-control"
                  type="text"
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

              <div className="mt-2">
                <button type="submit" className="btn btn-success">
                  Đăng nhập
                </button>
                <button type="button" className="mx-2 btn btn-primary">
                  Đăng ký
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
