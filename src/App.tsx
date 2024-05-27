import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";


export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to bye', filter: 'all'},
    ])

    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ]
    })




    const removeTask = (taskId: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let resultTasks = tasks.filter(el => el.id !== taskId)
        tasksObj[todolistId] = resultTasks
        setTasks({...tasksObj})
    }
    const addTask = (title: string, todolistId: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [task, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }
    const changeFilter = (filterValue: FilterValueType, todolistId: string) => {
        let task = todolists.find(el => el.id === todolistId)
        if (task) {
            task.filter = filterValue
        }
        setTodolists([...todolists])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task= tasks.find(el => el.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    const removeTodolist = (todolistId: string) => {
        let deleteTodo = todolists.filter(el => el.id !== todolistId)
        setTodolists(deleteTodo)

        delete tasksObj[todolistId]
        setTasks(tasksObj)
        console.log(tasksObj)
    }


    return (
        <div className="App">
            {
                todolists.map((tl) => {

                    let taskForTodolist = tasksObj[tl.id]
                    if (tl.filter === 'active') {
                        taskForTodolist = taskForTodolist.filter(el => el.isDone)
                    }
                    if (tl.filter === 'completed') {
                        taskForTodolist = taskForTodolist.filter(el => !el.isDone)
                    }
                    return (
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={taskForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
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
