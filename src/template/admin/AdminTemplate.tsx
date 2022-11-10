import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../../components/Sidebar/SidebarAdmin";
import MUIThemeProvider from "../../themes/MUIThemeProvider";

type Props = {};

export default function AdminTemplate({}: Props) {
  return (
    <MUIThemeProvider>
      <>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <SidebarAdmin></SidebarAdmin>
          <Box
            className=""
            sx={{
              flex: 1,
              padding: '12px'
            }}
          >

            <Outlet></Outlet>
          </Box>
        </Box>
      </>
    </MUIThemeProvider>
  );
}
