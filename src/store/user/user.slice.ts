
import { getStoreLocal } from "@/utils/local-storage";
import { register, login, logout,  checkAuth } from "./user.actions";
import { IInitialState } from "./user.interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IInitialState = {
    user: getStoreLocal("user"),
    // user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
    isLoading: false, 
    status: null
}

export const userSlice = createSlice({
    name: "user", 
    initialState, 
    reducers:{}, 
    extraReducers: builder =>{
        builder
        .addCase(register.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, {payload})=>{
            state.isLoading = false
            state.user = payload.user
        })
        .addCase(register.rejected, (state)=>{
            state.isLoading = false
            state.user = null
        })
        


        .addCase(login.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, {payload})=>{
            state.isLoading = false
            state.user = payload.user
        })
        .addCase(login.rejected, (state)=>{
            state.isLoading = false
            state.user = null
            state.status = "Неверный пароль или email"
        })



        .addCase(logout.fulfilled, (state)=>{
            state.isLoading = false
            state.user = null
        })
        .addCase(checkAuth.fulfilled, (state, {payload})=>{
            state.user = payload.user
        })
    }
})