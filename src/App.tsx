import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';


//C
//R(view mode, filter, sort, search, pagination)
//U
//D

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    // Date
    const todolistTitle: string = "What to learn"
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "JS/TS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ])

    //change Logic
    const removeTask = (taskId: number) => {
        const nextState = tasks.filter(t => t.id !== taskId)
        setTasks(nextState)

    }

    // UI Logic

    // UI
    return (
        <div className="App">
            <Todolist title={todolistTitle}
                      tasks={tasks}
                      removeTask={removeTask}
                      //changeFilter={changeFilter}
            />
            {/* Todolist({title: "What to learn"}) */}
        </div>
    );
}

export default App;
