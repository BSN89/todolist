import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";


//C
//R(view mode, filter, sort, search, pagination)
//U
//D

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    // Date
    const todolistTitle: string = "What to learn"
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JS/TS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ])

    //change Logic
    const removeTask = (taskId: string) => {
        const nextState = tasks.filter(t => t.id !== taskId)
        setTasks(nextState)
    }

    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    // UI Logic

    // UI
    return (
        <div className="App">
            <Todolist title={todolistTitle}
                      tasks={tasks}
                      addTask={addTask}
                      removeTask={removeTask}

            />

        </div>
    );
}

export default App;
