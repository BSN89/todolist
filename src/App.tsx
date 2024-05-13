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

    // Date------------------
    const todolistTitle: string = "What to learn"
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JS/TS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ])

    //change Logic----------------
//create
    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }
    //delete
    const removeTask = (taskId: string) => {
        const nextState = tasks.filter(t => t.id !== taskId)
        setTasks(nextState)
    }
    //update
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
      // const taskForUpdate = tasks.find(t => t.id === taskId)
      //   if(taskForUpdate){
      //       taskForUpdate.isDone = !taskForUpdate.isDone
      //   }
      //   setTasks([...tasks])
        const nextState: Array<TaskType> = tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
            setTasks(nextState)
    }

    // UI Logic-------------

    // UI-------------------
    return (
        <div className="App">
            <Todolist title={todolistTitle}
                      tasks={tasks}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeTaskStatus={changeTaskStatus}

            />

        </div>
    );
}

export default App;
