import React from 'react';
import { FilterValueType } from './App';


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
    addTask: () => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask}: TodolistProps) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button onClick={ () => {addTask()} }>+</button>
            </div>
            <ul>
                {
                    tasks.map(el =>
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={ () => removeTask(el.id) }>x</button>
                        </li>
                    )
                }

            </ul>
            <div>
                <button onClick={ () => changeFilter('all')}>All</button>
                <button onClick={ () => changeFilter('active')}>Active</button>
                <button onClick={ () => changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};