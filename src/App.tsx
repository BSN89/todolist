import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilteValueType = 'all' | 'active' | 'completed'
function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])
    const [filter, setFilter] = useState<FilteValueType>('all')

    let taskForTodolist = tasks
    if(filter === 'active'){
        taskForTodolist = tasks.filter(el => !el.isDone )
    }
    if(filter === 'completed'){
        taskForTodolist = tasks.filter(el => el.isDone )
    }

    const filteredTask = (filterValue: FilteValueType) => {
        setFilter(filterValue)
    }
    const removeTask = (taskID: string) => {
        let filteredTasks = tasks.filter(el => el.id !== taskID)
        setTasks(filteredTasks)
    }
    const addTask = (newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])

    }
    const changeTaskStatus = (taskID: string, isDoneValue: boolean) => {
        const newTasks = tasks.map(el => el.id === taskID ? {...el, isDone: isDoneValue } : el)
        setTasks(newTasks)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={taskForTodolist}
                      addTask={addTask}
                      removeTask={removeTask}
                      filteredTask={filteredTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    )
}

export default App;
