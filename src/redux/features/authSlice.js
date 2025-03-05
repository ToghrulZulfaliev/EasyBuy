import { createSlice } from "@reduxjs/toolkit";
import { RemoveFromLocalStorage, SaveToLocalStorage } from "../../utils/storages/LocalStorage";

const initialState = {
    access_token: null,
    user: null,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAll: (state, action) => {
            state.access_token = action.payload.access_token;
            state.user = action.payload.user;
            SaveToLocalStorage('access_token', action.payload.access_token);
            SaveToLocalStorage('user', action.payload.user);
        },
        setAccessToken: (state, action) => {
            state.access_token = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearAll: (state) => {
            state.access_token = null;
            state.user = null;
            RemoveFromLocalStorage('access_token');
            RemoveFromLocalStorage('user');
        }
    }
});

export const { setAll, setAccessToken, setUser, clearAll } = authSlice.actions;
export default authSlice.reducer;