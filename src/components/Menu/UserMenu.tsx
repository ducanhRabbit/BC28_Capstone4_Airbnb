import { Box } from '@mui/material';
import React from 'react'
import { NavLink } from 'react-router-dom';

type Props = {
    fontSize: string | object,
    padding: string | number | object,

}
interface customAsProps {
    custom: Props
}

export default function UserMenu({custom}: customAsProps) {
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
    const user = true;

    const obj = profileMenu.find((item) => item.login === !!user);
    const menuList = obj?.menu;
  return (
    <>
    {menuList?.map((menu, index) => {
        return (
          <NavLink to={menu.link}>
            <Box sx={custom}>

            {menu.content}
            </Box>
          </NavLink>
        );
    })
    }
    </>
  )
}