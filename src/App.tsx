import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";


export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])
    let [filter, setFilter] = useState('all')

    const removeTask = (taskId: string) => {
        let resultTasks = tasks.filter(el => el.id !== taskId)
        setTasks(resultTasks)
    }
    const changeFilter = (filterValue: FilterValueType) => {
        setFilter(filterValue)
    }
    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    let taskForTodolist = tasks
    if (filter === 'active') {
        taskForTodolist = tasks.filter(el => el.isDone)
    }
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(el => !el.isDone)
    }
    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    )
}

export default App;
