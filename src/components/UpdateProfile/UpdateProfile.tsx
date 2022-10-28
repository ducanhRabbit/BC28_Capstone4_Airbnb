import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/configStore";
import * as Yup from "yup";
import { putUseApi } from "../../redux/reducers/userReducer";

type Props = {};
type UpdateProfile = {
  name: string;
  email: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
};
export default function UpdateProfile({}: Props) {
  const userLogin = useSelector(
    (state: RootState) => state.userReducer.userLogin
  );
  console.log(userLogin.id);
  const dispatch: AppDispatch = useDispatch();
  const initialValues: UpdateProfile = {
    email: "",
    phone: "",
    birthday: "",
    gender: true,
    role: "",
    name: "",
  };
  const registerSchema = Yup.object().shape({
    email: Yup.string()
      .required("Không được bỏ trống!")
      .email("Email không hợp lệ"),
    name: Yup.string().required("Không được bỏ trống!"),
    phone: Yup.string()
      .length(10, "Nhập lại số điện thoại !")
      .required("Không được bỏ trống!"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          console.log({ values });
          let action = putUseApi(userLogin.id, values);
          dispatch(action);
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
              {errors.name && touched.name ? (
                <p className="text-danger">{errors.name}</p>
              ) : null}
            </div>
            <div className="form-group">
              <p>Email</p>
              <Field
                className="form-control"
                type="email"
                name="email"
                id="email"
              />
              {errors.email && touched.email ? (
                <p className="text-danger">{errors.email}</p>
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
              {errors.phone && touched.phone ? (
                <p className="text-danger">{errors.phone}</p>
              ) : null}
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
            <div className="form-group">
              <p>Birthday</p>
              <Field
                type="date"
                name="birthday"
                id="birthday"
                min="1989-1-1"
                max="2022-10-31"
              />
            </div>

            <div className="mt-2">
              <button type="submit" className="btn btn-success">
                UpDate
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
