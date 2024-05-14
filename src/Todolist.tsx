import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilteValueType, TaskType} from './App';
import {Button} from './Button';

type TodolistProps = {
    title: string
    tasks: TaskType[]
    addTask: (newTitle: string) => void
    removeTask: (taskID: string) => void
    filteredTask: (filterValue: FilteValueType) => void
}

export const Todolist = ({title, tasks, removeTask, filteredTask, addTask}: TodolistProps) => {
    let [taskTitle, setTaskTitle] = useState('')
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }
    const onKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const changeFilterTaskHandler = (filter: FilteValueType) => {
        filteredTask(filter)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyUpHandler}
                />
                <Button title={'+'} onClick={addTaskHandler}/>
            </div>
            <ul>
                {tasks.length === 0
                    ? <p>Тасок нет</p>
                    : tasks.map(el => {
                            const removeTaskHandler = () => removeTask(el.id)
                            return (
                                <li key={el.id}>
                                    <input type="checkbox" checked={el.isDone}/>
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
                <Button onClick={() => changeFilterTaskHandler('all')} title={'All'}/>
                <Button onClick={() => changeFilterTaskHandler('active')} title={'Active'}/>
                <Button onClick={() => changeFilterTaskHandler('completed')} title={'Completed'}/>

            </div>
        </div>
    );
};