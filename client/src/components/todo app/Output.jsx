import Button from "./Button";
import { useDispatch } from "react-redux";
import { todoAppActions } from "../../store/todoStore/todoAPP";
import api from "../../api/serverApi";

const Output = (props)=>{

    const dispatch = useDispatch();

    const deleteHandler = async(_id)=>{
      try {
         // Retrieve and parse userData from localStorage
    const storedUserData = localStorage.getItem('userData');
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
  
    if (!userData || !userData.token) {
      throw new Error('No token found');
    }
  
    
        await api.delete('/todos/', {
            data: { _id } // Use the `data` property to send the request body
        });
       
         dispatch(todoAppActions.delete({_id}))
      } catch (error) {
        console.log(error)
      }
    }

    const updateHandler = (_id,work,date)=>{
        date = date.split('/').reverse().join('-');
        props.setIdUpdater(_id);
        props.workRef.current.value=work;
        props.dateRef.current.value=date;
    }

     
    return (
      <div className="flex flex-col sm:flex-row justify-between items-center py-3 border-orange-500 border-2 w-[90vw] h-auto my-2 rounded-md shadow-md">
      <p className="text-lg sm:text-xl md:text-2xl flex-1 text-center sm:text-left ml-4">{props.work}</p>
      <p className="text-lg sm:text-xl md:text-2xl flex-1 text-center sm:text-left">{props.date}</p>
      <div className="flex flex-col sm:flex-row justify-between items-center w-full sm:w-auto mt-2 sm:mt-0 space-y-2 sm:space-y-0 sm:space-x-2 sm:mr-4">
        <Button text={'Delete'} color={'red'} onClick={() => deleteHandler(props._id)} className="w-full sm:w-auto" />
        <Button text={'Update'} color={"green"} onClick={() => updateHandler(props._id, props.work, props.date)} className="w-full sm:w-auto" />
      </div>
    </div>
    
    
    );
}

export default Output;
