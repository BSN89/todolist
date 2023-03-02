import React from "react";


type PropsType={
    shapka: string
    body?: number
}

  const Todolist=(props: PropsType)=>{
     return (
    <div>
        <h3>{props.shapka}</h3>
        <h3>{props.body}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            <li><input type="checkbox" checked={true}/> <span>HTML&CSS</span></li>
            <li><input type="checkbox" checked={true}/> <span>JS</span></li>
            <li><input type="checkbox" checked={false}/> <span>React</span></li>
        </ul>
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
        </div>
        )
}

export default Todolist