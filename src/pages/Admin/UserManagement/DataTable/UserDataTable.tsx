import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/configStore'
import { getPaginationUserAPI } from '../../../../redux/reducers/userReducer'

type Props = {}

export default function UserDataTable({}: Props) {
  const dispatch:AppDispatch= useDispatch()
  const{userData} = useSelector((state:RootState) => state.userReducer)
  const columns:GridColDef[] = [
    {
      field: 'id', headerName:'ID',width:70
    },
    {
      field: 'name', headerName:'Name',width:70
    },
    {
      field: 'email', headerName:'email',flex:1
    },
  
    
  ]
  const [pageState,setPageState] = useState({
    isLoading: false,
    data:[],
    total:0,
    page:1,
    pageSize:10

  })

  useEffect(()=>{
    setPageState(prev =>({...prev,isLoading:true}))
    const actionThunk = getPaginationUserAPI(pageState.page,pageState.pageSize);
    dispatch(actionThunk);
    setPageState(prev =>({...prev,isLoading:false,data:userData}))
    console.log(pageState.data);
  },[pageState.page,pageState.pageSize])
  return (
    <DataGrid 
    autoHeight
    rows={pageState.data}
    rowCount={pageState.total}
    loading={pageState.isLoading}
    rowsPerPageOptions={[5,10,15]}
    pagination
    page={pageState.page}
    pageSize={pageState.pageSize}
    paginationMode="server"
    onPageChange={(newPage) => setPageState(prev =>({...prev,page:newPage}))}
    onPageSizeChange={(newPageSize) => setPageState(prev =>({...prev,pageSize:newPageSize}))}
    columns={columns}
    />
  )
}