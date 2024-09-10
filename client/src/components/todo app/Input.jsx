
import Button  from "./button";

import { useDispatch } from "react-redux";
import { todoAppActions } from "../../store/todoStore/todoAPP";
import axios from 'axios'



const Input = (props)=>{
   
    const {workRef,dateRef,idUpdater,setIdUpdater} = props;

     const dispatch = useDispatch()
     
    const handleAdd = async ()=>{
       try {
        const payload = {
            work:workRef.current.value,
            date:dateRef.current.value
        }
        const response = await axios.post('http://localhost:8000/',payload);
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
                work:workRef.current.value,
                date:dateRef.current.value
            }
            await axios.put('http://localhost:8000/',payload);
            dispatch(todoAppActions.edit(payload))
            // Reset state and form fields
            setIdUpdater(null);
            workRef.current.value = null;
            dateRef.current.value = null;
        };    


    return (
        <div className="flex justify-around py-3 bg-blue-300 border-blue-500 flex-row border-2 w-[90vw] h-16">
            <input type="text" ref={workRef} className="text-center bg-blue-100 border-gray-400 border-2 h-9 w-[40%] rounded-md" placeholder="ENTER YOUR TODO WORK" />
            <input type="date" ref={dateRef} className="bg-blue-300" />
             <Button text={idUpdater?'Edit':"Add"} color={"blue"} onClick={idUpdater?editHandler :handleAdd} />
        </div>
    );
}

export default Input;