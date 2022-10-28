import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/setting";
import { AppDispatch } from "../configStore";

// Define a type for the slice state
interface Location {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
}

export interface LocationState {
    arrLocation:Location[]
}

// Define the initial state using that type
const initialState:LocationState = {
    arrLocation: []
};


const locationReducer = createSlice({
  name: 'locationReducer',
  initialState,
  reducers: {
    setArrLocation: (state:any,action:any) =>{
        state.arrLocation = action.payload;        
    }
  },
});

export const {setArrLocation} = locationReducer.actions;

export default locationReducer.reducer;


//  --------------Call API----------------

export const getLocationAPI = ()=>{
  return async (dispatch:AppDispatch,getState:any) =>{
    try{
      let result = await http.get('/vi-tri');
      const action = setArrLocation(result.data.content);
      dispatch(action)
    }
    catch(err){
      console.log(err)
    }
  }
}