
import TodoHeader from "./TodoHeader";
import Input from "./Input";
import OutputList from "./OutputList";
import { useState, useRef ,useEffect } from "react";

import { useDispatch } from "react-redux";
import { todoAppActions } from "../../store/todoStore/todoAPP";




const TodoApp = ()=>{
    const workRef = useRef(null);
    const dateRef = useRef(null);
    const [idUpdater,setIdUpdater] = useState(null);

  
  
    return (
        
          <div className="flex items-center flex-col">
             <TodoHeader/>
             <Input workRef={workRef} dateRef={dateRef} idUpdater={idUpdater} setIdUpdater={setIdUpdater} />
             <OutputList workRef={workRef} dateRef={dateRef} setIdUpdater={setIdUpdater} /> 
          </div>
        
    );
}

export default TodoApp;