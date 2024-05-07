import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterValueType} from './App';


type TaskProps = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistProps = {
    title: string
    tasks: TaskProps[]
    removeTask: (taskId: string) => void
    changeFilter: (filterValue: FilterValueType) => void
    addTask: (title: string) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask}: TodolistProps) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')


    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(event.currentTarget.value)
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }
    const addTaskHandler = () => {
        addTask(newTaskTitle);
        setNewTaskTitle('')
    }
    const onAllClickHandler = () => changeFilter('all')
    const onActiveClickHandler = () => changeFilter('active')
    const onCompletedClickHandler = () => changeFilter('completed')


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                />
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {
                    tasks.map(el => {
                        const removeTaskHandler = () => removeTask(el.id)
                        return <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={removeTaskHandler}>x</button>
                        </li>
                    })
                }

            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};