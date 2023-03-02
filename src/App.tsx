import React from 'react';
import './App.css';
import Todolist from "./Todolist";

function App() {
    const shapka1='What to learn111 dfgdfgdfgg dfhfghfghhfgghfg'

    return (
        <div className="App">
            <Todolist shapka={shapka1} body={100200}/>
            <Todolist shapka={'What to learn222'}/>
        </div>
    );
}




export default App;
