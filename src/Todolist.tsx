import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilteValueType, TaskType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

type TodolistProps = {
    todolistId: string
    title: string
    tasks: TaskType[]
    addTask: (newTitle: string, todolistId: string) => void
    removeTask: (taskID: string, todolistId: string) => void
    filteredTask: (filterValue: FilteValueType, todolistId: string) => void
    changeTaskStatus: (taskId: string, newStatusValue: boolean, todolistId: string) => void
    filter: FilteValueType
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = ({
                             title,
                             tasks,
                             removeTask,
                             filteredTask,
                             addTask,
                             changeTaskStatus,
                             filter,
                             todolistId,
                             removeTodolist,
                             updateTask,
                             updateTodolist
                         }: TodolistProps) => {


    const changeFilterTaskHandler = (filter: FilteValueType) => {
        filteredTask(filter, todolistId)
    }
    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const addTasksCallback = () => {
        addTask(title, todolistId)
    }
    const updateTodolistHandler = (title: string) => {
        updateTodolist(todolistId, title)
    }

    return (
        <div>

            <div className={'todolist-title-container'}>
                <h3>
                    <EditableSpan value={title} onChange={updateTodolistHandler}/>
                </h3>
                <IconButton color="primary" onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>

            <div>
                <AddItemForm addItem={addTasksCallback}/>
            </div>
            <ul>
                {tasks.length === 0
                    ? <p>Тасок нет</p>
                    : tasks.map(el => {
                            const removeTaskHandler = () => removeTask(el.id, todolistId)
                            const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = event.currentTarget.checked
                                changeTaskStatus(el.id, newStatusValue, todolistId)
                            }
                            const changeTaskTitleHandler = (title: string) => {
                                updateTask(todolistId, el.id, title)
                            }

                            return (
                                <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                                    <input
                                        type="checkbox"
                                        checked={el.isDone}
                                        onChange={changeTaskStatusHandler}
                                    />

                                    <EditableSpan value={el.title} onChange={changeTaskTitleHandler}/>
                                    <IconButton color="primary" onClick={removeTaskHandler}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </li>
                            )
                        }
                    )
                }
            </ul>
            <div>
                <Button
                    variant={filter === 'all' ? 'outlined' : 'text'}
                    color={'inherit'}
                    onClick={() => changeFilterTaskHandler('all')}
                >All
                </Button>

                <Button
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={() => changeFilterTaskHandler('active')}
                    color={'primary'}
                >Active
                </Button>
                <Button
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={() => changeFilterTaskHandler('completed')}
                    color={'secondary'}
                >Completed
                </Button>

            </div>
        </div>
    );
};