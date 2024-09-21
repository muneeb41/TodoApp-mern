
import { createSlice } from "@reduxjs/toolkit";

// Retrieve userData from localStorage and parse it (if it exists)
const storedUserData = localStorage.getItem('userData');
const userData = storedUserData ? JSON.parse(storedUserData) : null;




const UserAuthSlice = createSlice({
    name: 'userAuthStore',
    initialState: userData,
    reducers:{
        signin: (state,action)=>{
          // Store userData in localStorage as a JSON string
          localStorage.setItem('userData', JSON.stringify(action.payload));
          // Update state
          return action.payload; // Replace the state with the new user data
        },
        login : (state,action)=>{
          localStorage.setItem('userData', JSON.stringify(action.payload));
          // Update state
          return action.payload; // Replace the state with the new user data
        },
        logout : (state,action)=>{
          localStorage.setItem('userData', null);
          // Update state
          return null ; 
        }
    }
})

export default UserAuthSlice;

export const UserAuthAction = UserAuthSlice.actions;