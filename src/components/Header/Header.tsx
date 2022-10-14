import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Typewriter from "typewriter-effect";
import Tippy from "@tippyjs/react/headless";
import PopperWrapper from "../Popper/Popper";
import SearchHeader from "./SearchHeader";
type Props = {};

export default function Header({}: Props) {
  const [activeSearch, setActiveSearch] = useState(false);
  const profileMenu = [
    {
      login: false,
      menu: [
        {
          id: 1,
          content: "Đăng nhập",
          link: "/",
        },
        {
          id: 2,
          content: "Đăng ký",
          link: "/",
        },
        {
          id: 3,
          content: "Cho thuê nhà",
          link: "/",
        },
        {
          id: 4,
          content: "Tổ chức trải nghiệm",
          link: "/",
        },
        {
          id: 5,
          content: "Trợ giúp",
          link: "/",
        },
      ],
    },
    {
      login: true,
      menu: [
        {
          id: 1,
          content: "Tin nhắn",
          link: "/",
        },
        {
          id: 2,
          content: "Chuyến đi",
          link: "/",
        },
        {
          id: 3,
          content: "Danh sách yêu thích ",
          link: "/",
        },
        {
          id: 4,
          content: "Cho thuê nhà",
          link: "/",
        },
        {
          id: 5,
          content: "Tổ chức trải nghiệm",
          link: "/",
        },
        {
          id: 6,
          content: "Giới thiệu chủ nhà",
          link: "/",
        },
        {
          id: 7,
          content: "Tài khoản",
          link: "/",
        },
        {
          id: 8,
          content: "Trợ giúp",
          link: "/",
        },
        {
          id: 9,
          content: "Đăng xuất",
          link: "/",
        },
      ],
    },
  ];
  const user = false;
  const renderMenuProfile = () => {
    let obj = profileMenu.find((item) => item.login === !!user);
    let menuList = obj?.menu;
    return menuList?.map((menu, index) => {
      return (
        <NavLink className="menu-item" to={menu.link}>
          {menu.content}
        </NavLink>
      );
    });
  };

  let isActiveCheck = activeSearch ? "active" : null;

  return (
    <header>
      <div className="container h-100">
        <div className="d-flex justify-content-between align-items-center h-100">
          <div className="left-header">
            <NavLink to={"/"} className="logo-brand d-flex align-items-center">
              <span className="logo me-1">
                <i className="fab fa-airbnb"></i>
              </span>
              <span className="brand-name">airbnb</span>
            </NavLink>
          </div>
          <div className="middle-header">
            <div className="search" onClick={() => setActiveSearch(true)}>
              <button className={`wrapper ${isActiveCheck}`}>
                <div className={`auto-typing ${isActiveCheck}`}>
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .typeString("Discover the colorful world...")
                        .pauseFor(2000)
                        .deleteAll()
                        .pauseFor(2000)
                        .start();
                    }}
                    options={{
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      wrapperClassName: `typer-wrapper`,
                    }}
                  />
                </div>
                {activeSearch && <SearchHeader/>}
                <span className="search-icon">
                  <i className="fas fa-search"></i>
                </span>
              </button>
            </div>
          </div>
          <div className="right-header d-flex align-items-center">
            <div className="host-language d-flex align-items-center me-2">
              <div className="host">Become a host</div>
              <div className="language">
                <i className="fas fa-globe"></i>
              </div>
            </div>
            <div className="profile">
              <Tippy
                trigger="click"
                interactive={true}
                render={(attrs) => (
                  <div className="profile-popper" tabIndex={-1} {...attrs}>
                    <PopperWrapper>
                      <div className="menu-content">{renderMenuProfile()}</div>
                    </PopperWrapper>
                  </div>
                )}
              >
                <button className="wrapper d-flex align-items-center">
                  <div className="burger-menu me-3">
                    <i className="fas fa-bars"></i>
                  </div>
                  <div className="user-info">
                    <img
                      src="https://www.tutorsvalley.com/public/storage/uploads/tutor/1574383712-1AB5217C-5A13-4888-A5A1-BE0BCADBC655.png"
                      alt=""
                      className="user-img w-100"
                    />
                  </div>
                </button>
              </Tippy>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
