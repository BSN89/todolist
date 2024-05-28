import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterValueType} from './App';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistProps = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filterValue: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
    onChangeSpan: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string,newTitle: string) => void
}

export const Todolist = ({
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter,
                             id,
                             removeTodolist,
                             onChangeSpan,
                             changeTodolistTitle
                         }: TodolistProps) => {


    const onAllClickHandler = () => changeFilter('all', id)
    const onActiveClickHandler = () => changeFilter('active', id)
    const onCompletedClickHandler = () => changeFilter('completed', id)
    const addTodolistHandler = () => {
        removeTodolist(id)
    }
    const addTaskHandler = (title: string) => {
        addTask(title, id)
    }
    const changeTodolistTitleHandler = (newTitle: string) => {
        changeTodolistTitle(id, newTitle )
    }

    return (
        <div>
            <h3><EditableSpan title={title} onChange={changeTodolistTitleHandler}/>
                <button onClick={addTodolistHandler}>x</button>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {
                    tasks.map(el => {
                        const removeTaskHandler = () => removeTask(el.id, id)
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(el.id, e.currentTarget.checked, id)
                        const onChangeSpanHandler = (newTitle: string) => {
                            onChangeSpan(el.id, newTitle, id)
                        }
                        return (
                            <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={el.isDone} onChange={changeTaskStatusHandler}/>
                                <EditableSpan title={el.title} onChange={onChangeSpanHandler}/>
                                <button onClick={removeTaskHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
};





