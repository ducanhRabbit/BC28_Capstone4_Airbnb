import React from "react";
import { NavLink, Outlet } from "react-router-dom";

type Props = {};

export default function AdminTemplate({}: Props) {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div className="w-25 bg-dark text-white">
        <nav className="pt-5 px-2 d-flex flex-column">
          <NavLink to="thongtinphong">Quản Lý Thông Tin Phòng</NavLink>
          <a href="#">Menu item 2</a>
          <a href="#">Menu item 3</a>
          <a href="#">Menu item 4</a>
          <a href="#">Menu item 5</a>
        </nav>
      </div>
      <div className="w-75">
        <Outlet />
      </div>
    </div>
  );
}
