
import { Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';

import React from 'react'
import UserDataTable from './DataTable/UserDataTable';

type Props = {}

export default function UserManagement({}: Props) {
  return (
    <div>
        <Typography component={'h1'} sx={{
          fontSize: 30,
          fontWeight:600,
          textAlign:'center'
        }}>Quản lý người dùng</Typography>
          
        <UserDataTable/>
    </div>
  )
}