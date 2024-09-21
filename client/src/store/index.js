import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoStore/todoAPP";
import UserAuthSlice from "./userStore/userAuth";


const store = configureStore({
    reducer: {
        todoAppStore: todoSlice.reducer,
        userAuthStore : UserAuthSlice.reducer
    }
});


export default store;