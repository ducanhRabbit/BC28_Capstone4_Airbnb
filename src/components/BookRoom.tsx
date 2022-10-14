import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import type { DatePickerProps, RadioChangeEvent } from 'antd';
import { DatePicker, Radio } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';

const { RangePicker } = DatePicker;

type Props = {};

export default function BookRoom({}: Props) {
  const [placement, SetPlacement] = useState<DatePickerProps['placement']>('bottomRight');

  const placementChange = (e: RadioChangeEvent) => {
    SetPlacement(e.target.value);
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  };

  return (
    <div className="col-4">
      <div className="detail_book">
        <div className="detail_book-layout">
          <div className="detail_book-header">
            <div className="detail_book-header-price">
              <span className="header_price">$28</span> <span>đêm</span>
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
                    <p className="detail_guest-btn-amount">1 khách</p>
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
                        <button className="guest_btn">+</button>
                        <p>1</p>
                        <button className="guest_btn">-</button>
                      </div>
                    </div>

                    <div className="detail_guest-item">
                      <div className="detail_guest-item-text">
                        <p className="guest_text-bold">Trẻ em</p>
                        <p className="guest_text-regular">Độ tuổi 2 - 12</p>
                      </div>
                      <div className="detail_guest-item-number">
                        <button className="guest_btn">+</button>
                        <p>1</p>
                        <button className="guest_btn">-</button>
                      </div>
                    </div>

                    <div className="detail_guest-item">
                      <div className="detail_guest-item-text">
                        <p className="guest_text-bold">Em bé</p>
                        <p className="guest_text-regular">Dưới 2 tuổi</p>
                      </div>
                      <div className="detail_guest-item-number">
                        <button className="guest_btn">+</button>
                        <p>1</p>
                        <button className="guest_btn">-</button>
                      </div>
                    </div>

                    <div className="detail_guest-item">
                      <div className="detail_guest-item-text">
                        <p className="guest_text-bold">Thú cưng</p>
                      </div>
                      <div className="detail_guest-item-number">
                        <button className="guest_btn">+</button>
                        <p>1</p>
                        <button className="guest_btn">-</button>
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
                <span>$28 x 5 đêm</span>
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
