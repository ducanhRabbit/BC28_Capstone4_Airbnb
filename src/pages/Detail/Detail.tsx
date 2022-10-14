import React from 'react';
import { NavLink } from 'react-router-dom';
import 'antd/dist/antd.css';
import BookRoom from '../../components/BookRoom';
import Comments from '../../components/Comments';

type Props = {};

export default function AirbnbDetail({}: Props) {
  return (
    <div className="detail">
      <div className="container">
        <h2 className="detail_title">Tree House 10 phút lái xe fr trung tâm</h2>
        <div className="detail_rate d-flex">
          <span>
            <i className="fas fa-star detail_rate-star"></i> <span>4,80</span>
          </span>
          <li className="ms-2">
            <NavLink className="detail_rate-note" to="/">
              222 đánh giá
            </NavLink>
          </li>
          <li className="ms-2">
            <NavLink className="detail_rate-note" to="/">
              Mueang Chiang Mai, Chiang Mai, Thái Lan
            </NavLink>
          </li>
        </div>
        <div className="detail_image">
          <img src="https://airbnbnew.cybersoft.edu.vn/images/phong1.jpg" alt="" />
        </div>
        <div className="detail_content row">
          <div className="col-8">
            <div className="detail_content--des">
              <div className="detail_content--des-top">
                <div className="top_name">
                  <h4 className="top_name-title">Phòng riêng tại nhà trên cây. Chủ nhà Duangporn</h4>
                  <div className="top_name-info">
                    <span>2 khách</span>
                    <li className="ms-2">
                      <span>2 phòng ngủ</span>
                    </li>
                    <li className="ms-2">
                      <span>2 giường</span>
                    </li>
                    <li className="ms-2">
                      <span>2 phòng tắm riêng</span>
                    </li>
                  </div>
                </div>
                <div className="top_imghost">
                  <img src="https://i.pravatar.cc/50" alt="host" />
                </div>
              </div>

              <hr />
              <div className="detail_content--des-middle">
                <div className="middle_item">
                  <i className="fab fa-product-hunt middle_item-icon"></i>
                  <div className="middle_item-text">
                    <span>Đỗ xe miễn phí</span>
                    <p className="middle_item-text-grey">
                      Đây là một trong số ít địa điểm có chỗ đỗ xe miễn phí tại khu vực.
                    </p>
                  </div>
                </div>

                <div className="middle_item">
                  <i className="fab fa-product-hunt middle_item-icon"></i>
                  <div className="middle_item-text">
                    <span>Đỗ xe miễn phí</span>
                    <p className="middle_item-text-grey">
                      Đây là một trong số ít địa điểm có chỗ đỗ xe miễn phí tại khu vực.
                    </p>
                  </div>
                </div>
              </div>

              <hr />
              <div className="detail_content--des-bottom row">
                <h4 className="bottom_title top_name-title">Nơi này có những gì cho bạn</h4>

                <div className="col-6">
                  <div className="bottom_item">
                    <svg
                      className="bottom_icon"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <path d="M2 6.242l2 2V28h19.757l2 2H4a2 2 0 0 1-1.995-1.85L2 28V6.242zm1.707-3.95l26 26-1.414 1.415-26-26 1.414-1.414zM28 2a2 2 0 0 1 1.994 1.85L30 4v21.757l-2-2V4H8.242L6.236 2.005 28 2zM7.877 12.12l2.383 2.38h-.101c-.342 0-.68.024-1.014.073a7 7 0 0 0 9.207 8.022l1.527 1.528A9 9 0 0 1 7.877 12.12zM16 7a9 9 0 0 1 8.123 12.88l-2.695-2.694h.04c.493 0 .98-.05 1.456-.151a7 7 0 0 0-9.277-7.63L12.12 7.877A8.965 8.965 0 0 1 16 7z"></path>
                    </svg>
                    <span className="bottom_text">Máy giặt</span>
                  </div>

                  <div className="bottom_item">
                    <svg
                      className="bottom_icon"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <path d="M12 28a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM16.027 3l.308.004a12.493 12.493 0 0 1 11.817 9.48l.07.3 1.73 7.782.027.144a2 2 0 0 1-1.83 2.285L28 23H2.247l-.15-.005a2 2 0 0 1-1.844-1.838L.247 21v-7l.004-.217a5 5 0 0 1 4.773-4.778L5.247 9h9V5h-14V3zm11.528 16H2.245l.002 2H28zM16.247 5.002V11h-11l-.177.005a3 3 0 0 0-2.818 2.819L2.247 14l-.001 3H27.11l-.84-3.783-.067-.28a10.494 10.494 0 0 0-9.596-7.921l-.292-.012z"></path>
                    </svg>
                    <span className="bottom_text">Bàn là</span>
                  </div>

                  <div className="bottom_item">
                    <svg
                      className="bottom_icon"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <path d="M9 29v-2h2v-2H6a5 5 0 0 1-4.995-4.783L1 20V8a5 5 0 0 1 4.783-4.995L6 3h20a5 5 0 0 1 4.995 4.783L31 8v12a5 5 0 0 1-4.783 4.995L26 25h-5v2h2v2zm10-4h-6v2h6zm7-20H6a3 3 0 0 0-2.995 2.824L3 8v12a3 3 0 0 0 2.824 2.995L6 23h20a3 3 0 0 0 2.995-2.824L29 20V8a3 3 0 0 0-2.824-2.995z"></path>
                    </svg>
                    <span className="bottom_text">Tivi</span>
                  </div>
                </div>

                <div className="col-6">
                  <div className="bottom_item">
                    <svg
                      className="bottom_icon"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <path d="M12 28a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM16.027 3l.308.004a12.493 12.493 0 0 1 11.817 9.48l.07.3 1.73 7.782.027.144a2 2 0 0 1-1.83 2.285L28 23H2.247l-.15-.005a2 2 0 0 1-1.844-1.838L.247 21v-7l.004-.217a5 5 0 0 1 4.773-4.778L5.247 9h9V5h-14V3zm11.528 16H2.245l.002 2H28zM16.247 5.002V11h-11l-.177.005a3 3 0 0 0-2.818 2.819L2.247 14l-.001 3H27.11l-.84-3.783-.067-.28a10.494 10.494 0 0 0-9.596-7.921l-.292-.012z"></path>
                    </svg>
                    <span className="bottom_text">Bàn là</span>
                  </div>

                  <div className="bottom_item">
                    <svg
                      className="bottom_icon"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <path d="M9 29v-2h2v-2H6a5 5 0 0 1-4.995-4.783L1 20V8a5 5 0 0 1 4.783-4.995L6 3h20a5 5 0 0 1 4.995 4.783L31 8v12a5 5 0 0 1-4.783 4.995L26 25h-5v2h2v2zm10-4h-6v2h6zm7-20H6a3 3 0 0 0-2.995 2.824L3 8v12a3 3 0 0 0 2.824 2.995L6 23h20a3 3 0 0 0 2.995-2.824L29 20V8a3 3 0 0 0-2.824-2.995z"></path>
                    </svg>
                    <span className="bottom_text">Tivi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <BookRoom />
        </div>

        <hr />
        <Comments />
      </div>
    </div>
  );
}
