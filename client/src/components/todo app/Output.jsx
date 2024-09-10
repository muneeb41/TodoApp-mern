import Button from "./button";
import { useDispatch } from "react-redux";
import { todoAppActions } from "../../store/todoStore/todoAPP";
import axios from "axios";

const Output = (props)=>{

    
    const dispatch = useDispatch();

    const deleteHandler = async(_id)=>{
      try {
        await axios.delete('https://todoapp-mern-g38t.onrender.com/', {
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
        <div className="flex justify-around py-3 border-orange-500 flex-row border-2 w-[90vw] h-16 my-2">
            <p className="text-2xl">{props.work}</p>
            <p className="text-2xl">{props.date}</p>
            <div className=" flex flex-row justify-between w-[25%] h-9">
            <Button text={'Delete'} color={'red'} onClick={()=>deleteHandler(props._id)} />
            <Button text={'Update'} color={"green"} onClick={()=>updateHandler(props._id,props.work,props.date)} />
            </div>
        </div>
    );
}

export default Output;