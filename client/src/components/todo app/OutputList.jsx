import React from 'react'
import Output from './Output';
import { useEffect } from 'react';
import { getAllTodo } from '../../store/todoStore/todoAPP';

import { useSelector ,useDispatch} from 'react-redux';


const OutputList = (props) => {
   
   const todoData= useSelector(store => store.todoAppStore.todos)
   const status= useSelector(store => store.todoAppStore.status)
   const dispatch = useDispatch();

 

   useEffect(() => {
    dispatch(getAllTodo());
}, [dispatch]);


if (status === 'loading') return <div>Loading...</div>;
if (status === 'failed') return <div>Error occurred!</div>;

   
  return (
   <>
      {todoData.map((item,index) =>{
        return  <Output key={item._id ||index} _id={item._id} work={item.work} date={item.date} {...props} />
       })}
   </>
  )
}

export default OutputList;