import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import type { DatePickerProps, RadioChangeEvent } from 'antd';
import { DatePicker, Radio } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import { amountGuest, getBookRoomApi, Room } from '../redux/reducers/phongThueReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/configStore';

const { RangePicker } = DatePicker;

type Props = {
  bookRoom: Room;
};

export default function BookRoom({ bookRoom }: Props) {
  let dispatch: AppDispatch = useDispatch();
  const { nguoiLon, treEm, emBe, thuCung } = useSelector((state: RootState) => state.phongThueReducer.guestNumber);

  const [placement, SetPlacement] = useState<DatePickerProps['placement']>('bottomRight');

  const placementChange = (e: RadioChangeEvent) => {
    SetPlacement(e.target.value);
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  };

  const countGuest = (value: boolean, text: string) => {
    const action = amountGuest({ value, text });
    dispatch(action);
  };

  useEffect(() => {
    const action = getBookRoomApi();
    dispatch(action);
  }, []);

  return (
    <div className="col-4">
      <div className="detail_book">
        <div className="detail_book-layout">
          <div className="detail_book-header">
            <div className="detail_book-header-price">
              <span className="header_price">${bookRoom?.giaTien}</span> <span>đêm</span>
            </div>
            <div className="detail_book-header-rate">
              <span>
                <i className="fas fa-star detail_rate-star"></i> <span>4,80</span>
              </span>
              <li className="ms-2">
                <NavLink className="detail_rate-note" to="/">
                  222 đánh giá
                </NavLink>
              </li>
            </div>
          </div>

          <div className="detail_book-body">
            <div className="detail_book-body-date">
              <RangePicker placement={placement} disabledDate={disabledDate} />
            </div>

            <div className="detail_book-body-guest accordion accordion-flush" id="accordionFlushExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                  <button
                    className="detail_guest-btn accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    <p>Khách</p>
                    <p className="detail_guest-btn-amount">
                      {nguoiLon + treEm} khách
                      <span>{emBe >= 1 ? `, ${emBe} em bé` : ''}</span>
                      <span>{thuCung >= 1 ? `, ${thuCung} thú cưng` : ''}</span>
                    </p>
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="detail_guest-layout accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <div className="detail_guest-item">
                      <div className="detail_guest-item-text">
                        <p className="guest_text-bold">Người lớn</p>
                        <p className="guest_text-regular">Từ 13 tuổi trở lên</p>
                      </div>
                      <div className="detail_guest-item-number">
                        <button onClick={() => countGuest(true, 'nguoiLon')} className="guest_btn">
                          +
                        </button>
                        <p>{nguoiLon}</p>
                        <button onClick={() => countGuest(false, 'nguoiLon')} className="guest_btn">
                          -
                        </button>
                      </div>
                    </div>

                    <div className="detail_guest-item">
                      <div className="detail_guest-item-text">
                        <p className="guest_text-bold">Trẻ em</p>
                        <p className="guest_text-regular">Độ tuổi 2 - 12</p>
                      </div>
                      <div className="detail_guest-item-number">
                        <button onClick={() => countGuest(true, 'treEm')} className="guest_btn">
                          +
                        </button>
                        <p>{treEm}</p>
                        <button onClick={() => countGuest(false, 'treEm')} className="guest_btn">
                          -
                        </button>
                      </div>
                    </div>

                    <div className="detail_guest-item">
                      <div className="detail_guest-item-text">
                        <p className="guest_text-bold">Em bé</p>
                        <p className="guest_text-regular">Dưới 2 tuổi</p>
                      </div>
                      <div className="detail_guest-item-number">
                        <button onClick={() => countGuest(true, 'emBe')} className="guest_btn">
                          +
                        </button>
                        <p>{emBe}</p>

                        <button onClick={() => countGuest(false, 'emBe')} className="guest_btn">
                          -
                        </button>
                      </div>
                    </div>

                    <div className="detail_guest-item">
                      <div className="detail_guest-item-text">
                        <p className="guest_text-bold">Thú cưng</p>
                      </div>
                      <div className="detail_guest-item-number">
                        <button onClick={() => countGuest(true, 'thuCung')} className="guest_btn">
                          +
                        </button>
                        <p>{thuCung}</p>

                        <button onClick={() => countGuest(false, 'thuCung')} className="guest_btn">
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button className="detail_book-body-btnSubmit">Đặt phòng</button>
            </div>
            <p className="detail_book-body-note">Bạn vẫn chưa bị trừ tiền</p>

            <div className="detail_book-body-des d-flex justify-content-between">
              <div>
                <span>${bookRoom?.giaTien} x 5 đêm</span>
              </div>
              <p>$140</p>
            </div>

            <div className="detail_book-body-des d-flex justify-content-between">
              <div>
                <span>Giảm giá theo tuần</span>
              </div>
              <p>$0</p>
            </div>

            <div className="detail_book-body-des d-flex justify-content-between">
              <div>
                <span>Phí dịch vụ</span>
              </div>
              <p>$0</p>
            </div>

            <hr />
          </div>

          <div className="detail_book-total d-flex justify-content-between">
            <p>Tổng trước thuế</p>
            <p>$165</p>
          </div>
        </div>
      </div>
    </div>
  );
}
