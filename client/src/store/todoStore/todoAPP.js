
import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const getAllTodo = createAsyncThunk('todos/getAllTodo', async () => {
    const url = 'http://localhost:8000';
    
    // Retrieve and parse userData from localStorage
    const storedUserData = localStorage.getItem('userData');
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
  
    if (!userData || !userData.token) {
      throw new Error('No token found');
    }
  
    const { token , email} = userData;
    
    const response = await axios.get(url + '/todos/', {
      headers: {
        Authorization: `Bearer ${token}`, // Send the token as a Bearer token
      },
      params: {
        email
      },
    });
  
    return response.data;
  });





const todoSlice = createSlice({
    name :"todoAppStore",
    initialState:{
        todos:[],
        status:'idle',
        error: null
    },
    reducers:{
        add:(state,action)=>{
             state.todos = [...state.todos,action.payload];
            return state;
            
        },
        delete:(state,action)=>{
         state.todos =  state.todos.filter(item => item._id != action.payload._id)
         
         return state;
        },
        edit:(state,action)=>{
           state.todos = state.todos.map(item => {
                if (item._id === action.payload._id) {
                    // Create a new object with updated values
                    return action.payload
                }
                return item; // Return unchanged items
            });
            
            return state; 
        },
        logout : (state,action)=>{
            state.todos = []
            state.status = 'failed'
            return state;
        }        
    },
    extraReducers : (builder)=>{
        builder
        .addCase(getAllTodo.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getAllTodo.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.todos = action.payload;
        })
        .addCase(getAllTodo.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    }
})

export default todoSlice;

export const todoAppActions = todoSlice.actions;
