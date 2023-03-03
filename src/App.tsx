import React from 'react';
import './App.css';
import Todolist from "./Todolist";

function App() {
    const shapka1='What to learn111 dfgdfgdfgg dfhfghfghhfgghfg'

    const tasks1 = [
        {id: 1, title:"HTML&CSS", isDone: true},
        {id: 2, title:"JS", isDone: true},
        {id: 3, title:"ReactJS", isDone: false}
    ]
    const tasks2 = [
        {id: 1, title:"Hello world", isDone: true},
        {id: 2, title:"I am happy", isDone: false},
        {id: 3, title:"Yo", isDone: false},
        {id: 4, title:"Yo2", isDone: false},

    ]


    let newArr = [1, 2, 3, 4]

    return (
        <div className="App">
            <Todolist shapka={shapka1} body={100200} tasks={tasks1}/>
            <Todolist shapka={'What to learn222'} tasks={tasks2}/>
        </div>
    );
}




export default App;
