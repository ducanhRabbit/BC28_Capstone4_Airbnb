import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/configStore";
import { postSignin } from "../../redux/reducers/userReducer";
import { http, TOKEN_CYBERSOFT } from "../../util/setting";

type Props = {};

export interface userLogin {}

export default function Loign({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const initialValues = {};
  return (
    <div className="login">
      <div className="container">
        <h3>ĐĂNG NHẬP</h3>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log({ values });
            const action = postSignin(values);
            dispatch(action);
          }}
        >
          <Form>
            <div className="form-group">
              <p>Email</p>
              <Field
                className="form-control"
                type="text"
                name="email"
                id="email"
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

            <div className="mt-2">
              <button type="submit" className="btn btn-success">
                Đăng nhập
              </button>
              <button type="button" className="mx-2 btn btn-primary">
                Đăng ký
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
