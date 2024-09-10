

const Button = (props)=>{
   const  handler = props.onClick ||function empty(){}


  const colorClasses = {
    blue: 'bg-blue-500 active:bg-blue-700',
    red: 'bg-red-500 active:bg-red-700',
    green: 'bg-green-500 active:bg-green-700'
    
  };
   

    return (
        <button onClick={handler}
        className={`w-24 rounded-lg text-white bg-${props.color}-500 active:bg-${props.color}-700`}
         >{props.text}</button>
    );
}

export default Button;