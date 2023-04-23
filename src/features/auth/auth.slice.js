import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userAuth:{
        status: false,
        userDetails: null,
        error: null
    }        
};


export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    userAction:(state, action)=>{
        state.userAuth = action.payload
    }
  },
  extraReducers: (builder) => {},
});

export const {userAction} = authSlice.actions;


export const selectUser = (state) => state.auth.userAuth;


export default authSlice.reducer;
