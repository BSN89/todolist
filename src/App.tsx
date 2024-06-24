import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilteValueType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilteValueType
}
export type StateTaskType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()


    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<StateTaskType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false},
        ],
    })


    const filteredTask = (filterValue: FilteValueType, todolistId: string) => {
        const newTodolist = todolists.map(t => t.id === todolistId ? {...t, filter: filterValue} : t)
        setTodolists(newTodolist)
    }
    const removeTask = (taskID: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskID)})
    }
    const addTask = (newTitle: string, todolistId: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})

    }
    const changeTaskStatus = (taskID: string, isDoneValue: boolean, todolistId: string) => {

        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskID ? {...el, isDone: isDoneValue} : el)
        })
    }
    const removeTodolist = (todolistId: string) => {
        const removeTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(removeTodolist)
        delete tasks[todolistId]
        setTasks({...tasks})

    }
    const addTodolist = (title: string) => {
        const todolistId = v1()
        const newTodolist: TodolistType = {id: todolistId, title: title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }
    const updateTask = (todolistId: string, taskId: string, title: string) => {
        const newTodolistTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title} : el)
        }
        setTasks(newTodolistTasks)
    }
const updateTodolist = (todolistId: string, title: string) => {
const newTodolists = todolists.map(el => el.id === todolistId ? {...el,title} :el)
    setTodolists(newTodolists)
}

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map((tl) => {
                    let taskForTodolist = tasks[tl.id]
                    if (tl.filter === 'active') {
                        taskForTodolist = taskForTodolist.filter(el => !el.isDone)
                    }
                    if (tl.filter === 'completed') {
                        taskForTodolist = taskForTodolist.filter(el => el.isDone)
                    }
                    return (
                        <Todolist
                            updateTodolist={updateTodolist}
                            updateTask={updateTask}
                            key={tl.id}
                            todolistId={tl.id}
                            title={tl.title}
                            tasks={taskForTodolist}
                            addTask={addTask}
                            removeTask={removeTask}
                            filteredTask={filteredTask}
                            changeTaskStatus={changeTaskStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                        />
                    )
                })
            }

        </div>
    )
}

export default App;
