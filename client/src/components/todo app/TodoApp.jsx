

import Input from "./Input";
import OutputList from "./OutputList";
import { useState, useRef  } from "react";
import { useSelector } from "react-redux";






const TodoApp = ()=>{
    const workRef = useRef(null);
    const dateRef = useRef(null);
    const [idUpdater,setIdUpdater] = useState(null);

    const userData = useSelector((state) => state.userAuthStore); // Get user data from Redux store

  
  
    return (
        
          <div className="flex items-center flex-col pt-3">
            {userData && <div className="text-3xl text-center mb-3">
                         Hello , { userData.name} <br />
                        Welcome to  Todo APP 
                </div>}
             <Input workRef={workRef} dateRef={dateRef} idUpdater={idUpdater} setIdUpdater={setIdUpdater} />
             <OutputList workRef={workRef} dateRef={dateRef} setIdUpdater={setIdUpdater} /> 
          </div>
        
    );
}

export default TodoApp;