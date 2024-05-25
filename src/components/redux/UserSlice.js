import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
})

export const userSlice = createSlice({
    name: 'info',
    initialState: {
        theme: 'themeDark',
        isLogin: false,
        user: [],
        isLoading: false,
        status: STATUSES.IDLE
    },
    reducers: {
        userSet: (state, action) => {
            state.isLogin = true;
            state.user = action.payload;
        },

        logoutSet: (state, action) => {
            state.isLogin = false;
            state.user = []
        },

        setStatus: (state, action) => {
            state.status = action.payload;
        },

        changeIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        changeTheme: (state, action) => {
            if (state.theme === 'themeDark') {
                state.theme = 'themeLight'
            } else {
                state.theme = 'themeDark'
            }
        }
    }
})

export const { userSet, setStatus, logoutSet, changeTheme, changeIsLoading } = userSlice.actions;

export default userSlice.reducer;



export function checkUser() {
    return async function fetchProductsThunk(dispatch, getstate) {
        dispatch(setStatus(STATUSES.LOADING))

        await axios.get(`${process.env.REACT_APP_secret_backEnd}/auth/validate`)
            .then((res) => {
                dispatch(userSet(res.data))
                dispatch(setStatus(STATUSES.IDLE))
            })
            .catch((error) => {
                dispatch(setStatus(STATUSES.ERROR))
            })
    }
}

export function logoutUser() {
    return async function fetchProductsThunk(dispatch, getstate) {
        dispatch(setStatus(STATUSES.LOADING))
        await axios.post(`${process.env.REACT_APP_secret_backEnd}/auth/logout`, null)
            .then((res) => {
                dispatch(logoutSet())
                dispatch(setStatus(STATUSES.IDLE))
            })
            .catch((error) => {
                dispatch(setStatus(STATUSES.ERROR))
            })
    }
}

