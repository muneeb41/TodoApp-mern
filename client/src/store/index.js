import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoStore/todoAPP";


const store = configureStore({
    reducer: {
        todoAppStore: todoSlice.reducer
    }
});


export default store;