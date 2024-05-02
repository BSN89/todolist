import React from 'react';
import {FilteValueType, TaskType} from './App';
import {Button} from './Button';

type TodolistProps = {
    title: string
    tasks: TaskType[]
    removeTask: (taskID: number) => void
    filteredTask:(filterValue: FilteValueType) => void
}

export const Todolist = ({title, tasks, removeTask, filteredTask}: TodolistProps) => {
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
                    : tasks.map(el =>
                        <li key={el.id}>

                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            {/*<button onClick={() => removeTask(el.id)}> x</button>*/}
                            <Button onClick={ () => removeTask(el.id) }
                                    title={'x'}
                            />
                        </li>
                    )
                }
            </ul>
            <div>
                <Button onClick={ () => filteredTask('all') } title={'All'}/>
                <Button onClick={ () => filteredTask('active') } title={'Active'}/>
                <Button onClick={ () => filteredTask('completed') } title={'Completed'}/>

            </div>
        </div>
    );
};