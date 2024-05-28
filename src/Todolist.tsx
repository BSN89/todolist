import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilteValueType, TaskType} from './App';
import {Button} from './Button';

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
}

export const Todolist = ({title, tasks, removeTask, filteredTask, addTask, changeTaskStatus, filter, todolistId, removeTodolist}: TodolistProps) => {
    let [taskTitle, setTaskTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    const addTaskHandler = () => {
        if(taskTitle.trim() !== ''){
            addTask(taskTitle.trim(), todolistId)
            setTaskTitle('')
        }else{
            setError('Title is required')
        }
    }
    const onKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const changeFilterTaskHandler = (filter: FilteValueType) => {
        filteredTask(filter, todolistId)
    }
    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    return (
        <div>

            <div className={'todolist-title-container'}>
                <h3>{title}</h3>
                <Button title={'x'} onClick={removeTodolistHandler}/>
            </div>

            <div>
                <input
                    value={taskTitle}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyUpHandler}
                    className={error ? 'error' : ''}
                />
                <Button title={'+'} onClick={addTaskHandler}/>
                {error && <div className={"error-message"}>{error}</div>}
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

                            return (
                                <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                                    <input
                                        type="checkbox"
                                        checked={el.isDone}
                                        onChange={changeTaskStatusHandler }
                                    />
                                    <span>{el.title}</span>
                                    <Button onClick={removeTaskHandler}
                                            title={'x'}
                                    />
                                </li>
                            )
                        }
                    )
                }
            </ul>
            <div>
                <Button
                    className={filter === 'all' ? 'active-filter' : ''}
                    onClick={() => changeFilterTaskHandler('all')}
                    title={'All'}
                />
                <Button
                    className={filter === 'active' ? 'active-filter' : ''}
                    onClick={() => changeFilterTaskHandler('active')}
                        title={'Active'}
                />
                <Button
                    className={filter === 'completed' ? 'active-filter' : ''}
                    onClick={() => changeFilterTaskHandler('completed')}
                    title={'Completed'}
                />

            </div>
        </div>
    );
};