import { Language } from "@mui/icons-material";
import { light } from "@mui/material/styles/createPalette";
import { createSlice, createStore } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const modeSlice = createSlice({
    name: "mode",
    initialState: {
        mode: Cookies.get("ansmode"),
        token: Cookies.get("ansToKEn"),
        account: Cookies.get("ansAcC"),
        Language:Cookies.get("ansLanguage2"),
        url:"http://127.0.0.1:8000/api/"
    },
    reducers: {
        toggleMode : (state)=>{
            if(state.mode==="light")
            {
                Cookies.set("ansmode","dark",{expires: 70})
                state.mode = "dark";
            }
            else
            {
                Cookies.set("ansmode","light",{expires: 70})
                state.mode = "light";
            }
        },
        setToken : (state,value)=>{
            Cookies.set("ansToKEn",value.payload,{expires: 70})
            state.token = value.payload;
        },
        setAcc : (state,value)=>{
            Cookies.set("ansAcC",value.payload,{expires: 70})
            state.account = value.payload;

            if(value.payload===1)
                window.location.href = '/admin/home';
            else if(value.payload===2)
                window.location.href = '/employee/home';
            else if(value.payload===4)
                window.location.href = '/delivary/home';
            else if(value.payload===3)
                window.location.href = '/profile';
            else
                window.location.href = '/';
        }
    }
})

const store = createStore(modeSlice.reducer);
export const modeActions = modeSlice.actions;

export default store;