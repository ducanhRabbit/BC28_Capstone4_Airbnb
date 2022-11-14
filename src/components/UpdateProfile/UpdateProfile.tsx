import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/configStore";
import * as Yup from "yup";
import { putUserApi } from "../../redux/reducers/userReducer";
import { getStoreJSON, USER_LOGIN } from "../../util/setting";

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
  const dispatch: AppDispatch = useDispatch();
  const initialValues: UpdateProfile = {
    email: userLogin.email,
    phone: "",
    birthday: "",
    gender: true,
    role: "",
    name: "",
  };
  const registerSchema = Yup.object().shape({
    name: Yup.string().required("Không được bỏ trống!"),
    phone: Yup.string()
      .length(10, "Nhập lại số điện thoại !")
      .required("Không được bỏ trống!"),
  });
  return (
    <div>
      {/* Modal trigger button */}
      {/* <button
        type="button"
        className="btn btn-primary btn-lg"
        data-bs-toggle="modal"
        data-bs-target="#modalIdProfile"
      >
        Launch
      </button> */}
      {/* Modal Body */}
      {/* if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard */}
      <div
        className="modal fade"
        id="modalIdProfile"
        tabIndex={-1}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitleId">
                Updata Profile
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <Formik
                initialValues={initialValues}
                validationSchema={registerSchema}
                onSubmit={(values) => {
                  console.log({ values });
                  let action = putUserApi(userLogin.id, values);
                  dispatch(action);
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="form-group">
                      <p className="py-2">Họ tên</p>
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
                      <p className="py-2">Email</p>
                      <input
                        type="email"
                        value={userLogin.email}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <p className="py-2">Số điện thoại</p>
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
                          <Field
                            type="radio"
                            name="gender"
                            value="true"
                            checked
                          />
                          <p>Nam</p>
                        </div>
                        <div className=" col-6 text-center">
                          <Field type="radio" name="gender" value="false" />
                          <p>Nữ</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-6 px-2">
                        <p className="py-2">Birthday:</p>
                        <Field
                          type="date"
                          name="birthday"
                          id="birthday"
                          min="1989-1-1"
                          max="2022-10-31"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="mt-2">
                      <button
                        type="submit"
                        className="btn btn-success"
                        data-bs-dismiss="modal"
                      >
                        UpDate
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      {/* Optional: Place to the bottom of scripts */};
    </div>
  );
}
