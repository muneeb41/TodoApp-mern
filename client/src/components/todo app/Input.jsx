
import Button  from "./Button";

import { useDispatch } from "react-redux";
import { todoAppActions } from "../../store/todoStore/todoAPP";
import axios from 'axios'
import { json } from "react-router-dom";


const Input = (props)=>{
    
    const url = 'http://localhost:8000'
    const {workRef,dateRef,idUpdater,setIdUpdater} = props;

     const dispatch = useDispatch()
     
    const handleAdd = async ()=>{
        const storedUserData = localStorage.getItem('userData');
        const userData = storedUserData ? JSON.parse(storedUserData) : null;

        if(!userData ||  !userData.token){
            throw new error('user not exist');
        }
        const token = userData.token;
       try {
        const payload = {
            work:workRef.current.value,
            date:dateRef.current.value,
            email: userData.email
        }
        const response = await axios.post(url+'/todos/',payload,{
            headers: {
                Authorization: `Bearer ${token}`, // Send the token as a Bearer token
              },
        });
        payload._id = response.data._id;
        dispatch(todoAppActions.add(payload))
        workRef.current.value=null
        dateRef.current.value=null;
       } catch (error) {
         console.log(error)
       }
    }

    const editHandler = async () => {
        const payload = {
          _id: idUpdater,
          work: workRef.current.value,
          date: dateRef.current.value
        };
      
        // Retrieve and parse userData from localStorage
        const storedUserData = localStorage.getItem('userData');
        const userData = storedUserData ? JSON.parse(storedUserData) : null;
      
        if (!userData || !userData.token) {
          throw new Error('No token found');
        }
      
        const { token } = userData;
      
        try {
          // Make the PUT request with the token in headers and payload as the body
          await axios.put(`${url}/todos/`, payload, {
            headers: {
              Authorization: `Bearer ${token}`, // Send the token as a Bearer token
            },
          });
      
          // Dispatch action to Redux store
          dispatch(todoAppActions.edit(payload));
      
          // Reset state and form fields
          setIdUpdater(null);
          workRef.current.value = '';
          dateRef.current.value = '';
      
        } catch (error) {
          console.error('Error updating the todo:', error);
          alert('Failed to update the todo. Please try again.');
        }
      };
      

    return (
      <div className="flex flex-col sm:flex-row justify-between items-center py-3 bg-blue-300 border-blue-500 border-2 w-[90vw] h-auto sm:h-16 space-y-2 sm:space-y-0 sm:space-x-2 sm:pr-4">
      <input
        type="text"
        ref={workRef}
        className="text-center bg-blue-100 border-gray-400 border-2 h-9 w-full sm:w-[40%] rounded-md sm:ml-4"
        placeholder="ENTER YOUR TODO WORK"
      />
      <input
        type="date"
        ref={dateRef}
        className="bg-blue-100 border-gray-400 border-2 h-9 w-full sm:w-auto rounded-md px-1"
      />
      <Button
        text={idUpdater ? 'Edit' : 'Add'}
        color={"blue"}
        onClick={idUpdater ? editHandler : handleAdd}
        
      />
    </div>
    
    );
}

export default Input;
