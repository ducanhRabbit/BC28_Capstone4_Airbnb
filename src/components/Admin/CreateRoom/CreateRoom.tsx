import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/configStore";
import { number } from "yup/lib/locale";
import { postRoomApi, Room } from "../../../redux/reducers/roomDetailReducer";
import { NavLink } from "react-router-dom";

type Props = {};

export default function CreateRoom({}: Props) {
  const userLogin = useSelector(
    (state: RootState) => state.userReducer.userLogin
  );
  console.log({ userLogin });
  const dispatch: AppDispatch = useDispatch();
  const initialValues: Room = {
    id: 0,
    tenPhong: "",
    khach: 0,
    phongNgu: 0,
    giuong: 0,
    phongTam: 0,
    moTa: "",
    giaTien: 0,
    mayGiat: false,
    banLa: false,
    tivi: false,
    dieuHoa: false,
    wifi: false,
    bep: false,
    doXe: false,
    hoBoi: false,
    banUi: false,
    maViTri: 0,
    hinhAnh: "",
  };
  //   const registerSchema = Yup.object().shape({
  //     password: Yup.string()
  //       .required("Không được bỏ trống!")
  //       .min(3, "Password nhiều hơn 3 ký tự!"),
  //     passwordConfirm: Yup.string()
  //       .required("Không được bỏ trống!")
  //       .min(3, "Password nhiều hơn 3 ký tự!"),
  //     email: Yup.string()
  //       .required("Không được bỏ trống!")
  //       .email("Email không hợp lệ"),
  //     name: Yup.string().required("Không được bỏ trống!"),
  //     phone: Yup.string()
  //       .length(10, "Nhập lại số điện thoại !")
  //       .required("Không được bỏ trống!"),
  //   });
  return (
    <div>
      <div className="container">
        <Formik
          initialValues={initialValues}
          //   validationSchema={registerSchema}
          onSubmit={(values) => {
            console.log({ values });
            let action = postRoomApi(userLogin.token, values);
            dispatch(action);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className=" row">
                <div className="form-group col-4 ">
                  <p className="py-2">Tên phòng</p>
                  <Field
                    className="form-control"
                    type="text"
                    name="tenPhong"
                    id="tenPhong"
                  />
                  {/* {errors.name && touched.name ? (
                  <p className="text-danger">{errors.name}</p>
                ) : null} */}
                </div>
                <div className="form-group col-4">
                  <p className="py-2">Số khách</p>
                  <Field
                    className="form-control"
                    type="number"
                    name="khach"
                    id="khach"
                  />
                  {/* {errors.email && touched.email ? (
                  <p className="text-danger">{errors.email}</p>
                ) : null} */}
                </div>
                <div className="form-group col-4">
                  <p className="py-2">Phòng Ngủ</p>
                  <Field
                    className="form-control"
                    type="number"
                    name="phongNgu"
                    id="phongNgu"
                  />
                  {/* {errors.password && touched.password ? (
                  <p className="text-danger">{errors.password}</p>
                ) : null} */}
                </div>
                <div className="form-group col-4">
                  <p className="py-2">Giường</p>
                  <Field
                    className="form-control"
                    type="number"
                    name="giuong"
                    id="giuong"
                  />
                  {/* {errors.passwordConfirm && touched.passwordConfirm ? (
                  <p id="err" className="text-danger">
                    {errors.passwordConfirm}
                  </p>
                ) : null} */}
                </div>

                <div className="form-group col-4">
                  <p className="py-2">Phòng tắm</p>
                  <Field
                    className="form-control"
                    type="number"
                    name="phongTam"
                    id="phongTam"
                  />
                  {/* {errors.phone && touched.phone ? (
                  <p className="text-danger">{errors.phone}</p>
                ) : null} */}
                </div>
                <div className="form-group col-4">
                  <p className="py-2">Giá tiền</p>
                  <Field
                    className="form-control"
                    type="number"
                    name="giaTien"
                    id="giaTien"
                  />
                </div>
                <div className="form-group col-4">
                  <p className="py-2">Máy giặt</p>
                  <Field as="select" name="mayGiat" className="form-control">
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                  </Field>
                  {/* {errors.phone && touched.phone ? (
                  <p className="text-danger">{errors.phone}</p>
                ) : null} */}
                </div>
                <div className="form-group col-4">
                  <p className="py-2">Bàn là</p>
                  <Field as="select" name="banLa" className="form-control">
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                  </Field>
                  {/* {errors.phone && touched.phone ? (
                  <p className="text-danger">{errors.phone}</p>
                ) : null} */}
                </div>
                <div className="form-group col-4">
                  <p className="py-2">Ti vi</p>
                  <Field as="select" name="tivi" className="form-control">
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                  </Field>
                  {/* {errors.phone && touched.phone ? (
                  <p className="text-danger">{errors.phone}</p>
                ) : null} */}
                </div>
                <div className="form-group col-4">
                  <p className="py-2">Điều hòa nhiệt độ</p>
                  <Field as="select" name="dieuHoa" className="form-control">
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                  </Field>
                  {/* {errors.phone && touched.phone ? (
                  <p className="text-danger">{errors.phone}</p>
                ) : null} */}
                </div>
                <div className="form-group col-4">
                  <p className="py-2">Wifi</p>
                  <Field as="select" name="wifi" className="form-control">
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                  </Field>
                  {/* {errors.phone && touched.phone ? (
                  <p className="text-danger">{errors.phone}</p>
                ) : null} */}
                </div>
                <div className="form-group col-4">
                  <p className="py-2">Bếp</p>
                  <Field as="select" name="bep" className="form-control">
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                  </Field>
                  {/* {errors.phone && touched.phone ? (
                  <p className="text-danger">{errors.phone}</p>
                ) : null} */}
                </div>
                <div className="form-group col-4">
                  <p className="py-2">Đỗ xe</p>
                  <Field as="select" name="doXe" className="form-control">
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                  </Field>
                  {/* {errors.phone && touched.phone ? (
                  <p className="text-danger">{errors.phone}</p>
                ) : null} */}
                </div>
                <div className="form-group col-4">
                  <p className="py-2">Hồ Bơi</p>
                  <Field as="select" name="hoBoi" className="form-control">
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                  </Field>
                  {/* {errors.phone && touched.phone ? (
                  <p className="text-danger">{errors.phone}</p>
                ) : null} */}
                </div>
                <div className="form-group col-4">
                  <p className="py-2">Bàn ủi</p>
                  <Field as="select" name="banUi" className="form-control">
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                  </Field>
                  {/* {errors.phone && touched.phone ? (
                  <p className="text-danger">{errors.phone}</p>
                ) : null} */}
                </div>
                <div className="form-group col-4">
                  <p className="py-2">Mã vị trí</p>
                  <Field
                    type="number"
                    name="maViTri"
                    id="maViTri"
                    className="form-control"
                  />
                  {/* {errors.phone && touched.phone ? (
                  <p className="text-danger">{errors.phone}</p>
                ) : null} */}
                </div>
                <div className="form-group col-4">
                  <p className="py-2">Hình ảnh</p>
                  <Field
                    type="text"
                    name="hinhAnh"
                    id="hinhAnh"
                    className="form-control"
                  />
                  {/* {errors.phone && touched.phone ? (
                  <p className="text-danger">{errors.phone}</p>
                ) : null} */}
                </div>
                <div className="form-group col-4">
                  <p className="py-2">Mô tả</p>
                  <Field
                    type="textarea"
                    name="moTa"
                    id="moTa"
                    className="form-control"
                  />
                  {/* {errors.phone && touched.phone ? (
                  <p className="text-danger">{errors.phone}</p>
                ) : null} */}
                </div>
              </div>
              <div className="mt-2 footer_register">
                <button type="submit" className="btn btn-success">
                  Create Room
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
