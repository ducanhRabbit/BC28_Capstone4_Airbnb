import { Box, Button, ButtonBase } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/configStore';
import { setUserLogin } from '../../redux/reducers/userReducer';
import { ACCESS_TOKEN, clearLocalStorage, USER_LOGIN } from '../../util/setting';

type Props = {
    fontSize: string | object,
    padding: string | number | object,

}
interface customAsProps {
    custom: Props
}

export default function UserMenu({custom}: customAsProps) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogOut = ()=>{
    clearLocalStorage(ACCESS_TOKEN)
    clearLocalStorage(USER_LOGIN)
    const action = setUserLogin(null)
    dispatch(action)
    navigate('/')
  }
  const {userLogin} = useSelector((state:RootState) => state.userReducer)
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
          ],
        },
      ];
    const user = !!userLogin;

    const obj = profileMenu.find((item) => item.login === !!user);
    const menuList = obj?.menu;
  return (
    <>
    {menuList?.map((menu, index) => {
        return (
          <div key={index} >
          <NavLink to={menu.link} >
            <Box sx={custom}>
            {menu.content}
            </Box>
          </NavLink>
          <ButtonBase onClick={handleLogOut} sx={{
            width: '100%'
          }}>Đăng xuất</ButtonBase>
          </div>
        );
    })
    }
    </>
  )
}