import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}
export type FilteValueType = 'all' | 'active' | 'completed'
function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'Typescript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false},
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
    const removeTask = (taskID: number) => {
        let filteredTasks = tasks.filter(el => el.id !== taskID)
        setTasks(filteredTasks)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      filteredTask={filteredTask}
            />
        </div>
    )
}

export default App;
