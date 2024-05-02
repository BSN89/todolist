import React from 'react';
import {TaskType} from './App';
import { Button } from './Button';

type TodolistProps = {
    title: string
    tasks: TaskType[]
}

export const Todolist = ({title, tasks}: TodolistProps) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.length === 0
                    ? <p>Тасок нет</p>
                    : tasks.map(el => <li key={el.id}>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span></li>)
                }
            </ul>
            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>

            </div>
        </div>
    );
};