import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import { amountGuest, getBookRoomApi, postBookRoomApi, Room } from '../../redux/reducers/roomDetailReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/configStore';
import { useAppSelector } from '../../redux/hooks';

const { RangePicker } = DatePicker;

type Props = {};

export default function BookRoom({}: Props) {
  const [close, setClose] = useState(false);
  let dispatch: AppDispatch = useDispatch();
  const [date, setDate] = useState({ ngayDen: '', ngayDi: '' });
  const [totalDate, setTotalDate] = useState(0);
  let { room } = useAppSelector((state) => state.roomDetailReducer);
  let [roomDetail] = [...room];

  const { nguoiLon, treEm, emBe, thuCung } = useSelector((state: RootState) => state.roomDetailReducer.guestNumber);
  const { bookRoom, arrBookRoom, guestNumber } = useSelector((state: RootState) => state.roomDetailReducer);
  const { arrCommentId } = useSelector((state: RootState) => state.commentReducer);

  let dates = [
    {
      ngayDen: '2022-10-01',
      ngayDi: '2022-10-02',
    },
  ];

  arrBookRoom.map((item, index) => {
    let obj = {
      ngayDen: item.ngayDen.toString(),
      ngayDi: item.ngayDi.toString(),
    };

    dates.push(obj);
  });

  const getDaysBetweenDates = function (startDate: any, endDate: any) {
    let now = startDate.clone(),
      datess = [];

    while (now.isSameOrBefore(endDate)) {
      datess.push(now.format('YYYY-MM-DD'));
      now.add(1, 'days');
    }
    return datess;
  };
  let dateList = dates.map((day) => getDaysBetweenDates(moment(day.ngayDen), moment(day.ngayDi)));

  let arrDayDisable = dateList.flatMap((a) => a);

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    let index = arrDayDisable.findIndex((date) => date === moment(current).format('YYYY-MM-DD'));
    return (current && current < moment().endOf('day')) || (index !== -1 && true);
  };

  const onChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
    if (dates) {
      setDate({
        ngayDen: moment.utc(dateStrings[0], 'YYYY-MM-DD').format('YYYY-MM-DD'),
        ngayDi: moment.utc(dateStrings[1], 'YYYY-MM-DD').format('YYYY-MM-DD'),
      });
      setTotalDate(
        moment.duration(moment(dateStrings[1], 'YYYY-MM-DD').diff(moment(dateStrings[0], 'YYYY-MM-DD'))).asDays()
      );
    } else {
      console.log('Clear');
    }
  };

  const countGuest = (value: boolean, text: string) => {
    const action = amountGuest({ value, text });
    dispatch(action);
  };

  const submitBookRoom = () => {
    let booked = {
      id: 0,
      maPhong: roomDetail?.id,
      ngayDen: date.ngayDen,
      ngayDi: date.ngayDi,
      soLuongKhach: guestNumber.nguoiLon + guestNumber.treEm,
      maNguoiDung: 1,
    };

    // console.log(date);
    const action = postBookRoomApi(booked);
    dispatch(action);
  };

  useEffect(() => {
    const action = getBookRoomApi();
    dispatch(action);
  }, [roomDetail?.id, dispatch]);
  console.log('filter');

  const handleCloseTab = () => {
    setClose(!close);
  };
  return (
    <div className="col-4">
      <div className="detail_book">
        <div className="detail_book-layout">
          <div className="detail_book-header">
            <div className="detail_book-header-price">
              <span className="header_price">${roomDetail?.giaTien}</span> <span>đêm</span>
            </div>
            <div className="detail_book-header-rate">
              <span>
                <i className="fas fa-star detail_rate-star"></i> <span>4,80</span>
              </span>
              <li className="ms-2">
                <a className="detail_rate-note" href="#detailComment">
                  {arrCommentId.length} đánh giá
                </a>
              </li>
            </div>
          </div>

          <div className="detail_book-body">
            <div className="detail_book-body-date">
              <RangePicker
                placeholder={['Nhận phòng', 'Trả phòng']}
                placement="bottomRight"
                disabledDate={disabledDate}
                onChange={onChange}
              />
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
                    <p className="guest_text-bold">Khách</p>
                    <p className="detail_guest-btn-amount">
                      {nguoiLon + treEm} khách
                      <span>{emBe >= 1 ? `, ${emBe} em bé` : ''}</span>
                      <span>{thuCung >= 1 ? `, ${thuCung} thú cưng` : ''}</span>
                    </p>
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className={`${'close_tab' && close} detail_guest-layout accordion-collapse collapse`}
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
                    <div>
                      <p className="mt-4">
                        Chỗ ở này cho phép tối đa {roomDetail?.khach} khách, không tính em bé. Được phép mang theo thú
                        cưng.
                      </p>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="detail_guest-btn-close" onClick={handleCloseTab}>
                        Đóng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button onClick={submitBookRoom} className="detail_book-body-btnSubmit">
                Đặt phòng
              </button>
            </div>
            <p className="detail_book-body-note">Bạn vẫn chưa bị trừ tiền</p>

            <div className="detail_book-body-des d-flex justify-content-between">
              <div>
                <span>
                  ${roomDetail?.giaTien} x {totalDate} đêm
                </span>
              </div>
              <p>${roomDetail?.giaTien * totalDate}</p>
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
            <p>${roomDetail?.giaTien * totalDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
