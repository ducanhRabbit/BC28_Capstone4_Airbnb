import { FormikConfig, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/configStore';
import { ViTri } from '../../redux/reducers/locationDetailReducer';
import { postLocationAdminApi } from '../../redux/reducers/locationReducer';
// import * as React from 'react';
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps } from 'formik';

interface MyFormValues {
  id: number;
}

type Props = {
  //   location: ViTri;
};

export default function ModalAdminLocation({}: Props) {
  const [img, setImg] = useState('https://airbnbnew.cybersoft.edu.vn/images/vt6.jpg');
  const dispatch: AppDispatch = useDispatch();

  const initialValues: MyFormValues = { id: 0 };

  useEffect(() => {
    // const action = postLocationAdminApi()
    // dispatch(action)
  }, []);

  return (
    <div>
      <div
        className="modal fade"
        id="adminLocationModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-lg-down">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                <span className="detail_title">Thêm vị trí</span>
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                  console.log({ values, actions });
                  //   alert(JSON.stringify(values, null, 2));
                  //   actions.setSubmitting(false);
                }}
              >
                <Form className="row">
                  <div className="col-6">
                    {/* <div className="mb-3">
                      <label htmlFor="id" className="form-label modal_ad-lable">
                        Id
                      </label>
                      <Field id="id" name="id" className="form-control modal_ad-input" />
                    </div> */}

                    <div className="mb-3">
                      <label htmlFor="tenViTri" className="form-label modal_ad-lable">
                        Tên vị trí
                      </label>
                      <Field id="tenViTri" name="tenViTri" className="form-control modal_ad-input" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="tinhThanh" className="form-label modal_ad-lable">
                        Tỉnh thành
                      </label>
                      <Field id="tinhThanh" name="tinhThanh" className="form-control modal_ad-input" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="quocGia" className="form-label modal_ad-lable">
                        Quốc gia
                      </label>
                      <Field id="quocGia" name="quocGia" className="form-control modal_ad-input" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="hinhAnh" className="form-label modal_ad-lable">
                        Hình ảnh
                      </label>
                      <Field type="file" id="hinhAnh" name="hinhAnh" className="form-control modal_ad-input" />
                    </div>
                  </div>

                  <div className="col-6 d-flex align-items-center">
                    <div className="">
                      <img className="w-100 modal_ad-img" src={img} alt="img" />
                    </div>
                  </div>

                  <div>
                    <button type="submit" className="modal_ad-btn-submit">
                      Thêm
                    </button>
                  </div>
                </Form>
              </Formik>

              {/* <form className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label modal_ad-lable">
                      Id
                    </label>
                    <input type="email" className="form-control modal_ad-input" id="email" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label modal_ad-lable">
                      Tên vị trí
                    </label>
                    <input type="email" className="form-control modal_ad-input" id="email" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label modal_ad-lable">
                      Tỉnh thành
                    </label>
                    <input type="email" className="form-control modal_ad-input" id="email" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label modal_ad-lable">
                      Quốc gia
                    </label>
                    <input type="email" className="form-control modal_ad-input" id="email" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label modal_ad-lable">
                      Hình ảnh
                    </label>
                    <input type="file" className="form-control modal_ad-input" id="email" />
                  </div>
                </div>

                <div className="col-6 d-flex align-items-center">
                  <div className="">
                    <img className="w-100 modal_ad-img" src={img} alt="img" />
                  </div>
                </div>
                <div>
                  <button className="modal_ad-btn-submit">Thêm</button>
                </div>
              </form> */}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
