import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';


export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ])
    let [filter, setFilter] = useState('all')

    const removeTask = (taskId: number) => {
        let resultTasks = tasks.filter(el => el.id !== taskId)
        setTasks(resultTasks)
    }
    const changeFilter = (filterValue: FilterValueType) => {
        setFilter(filterValue)
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
            />
        </div>
    )
}

export default App;
