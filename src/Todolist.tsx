import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterValueType} from './App';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;


type TaskProps = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistProps = {
    id: string
    title: string
    tasks: TaskProps[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filterValue: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter, id, removeTodolist}: TodolistProps) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null> (null)


    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(event.currentTarget.value)
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === "Enter") {
            addTask(newTaskTitle, id);
        }
    }
    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '')
        addTask(newTaskTitle.trim(), id);
        setNewTaskTitle('')
        setError('Title is required')

    }
    const onAllClickHandler = () => changeFilter('all', id)
    const onActiveClickHandler = () => changeFilter('active', id)
    const onCompletedClickHandler = () => changeFilter('completed', id)
const addTodolistHandler = () => {
    removeTodolist(id)
}

    return (
        <div>
            <h3>{title} <button onClick={addTodolistHandler}>x</button></h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={'error-message'}>{error}</div> }
            </div>
            <ul>
                {
                    tasks.map(el => {
                        const removeTaskHandler = () => removeTask(el.id, id)
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(el.id, e.currentTarget.checked, id)
                        return <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={el.isDone} onChange={changeTaskStatusHandler}/>
                            <span>{el.title}</span>
                            <button onClick={removeTaskHandler}>x</button>
                        </li>
                    })
                }

            </ul>
            <div>
                <button className={filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All</button>
                <button className={filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};