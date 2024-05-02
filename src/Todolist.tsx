import {FilterValuesType, TaskType} from "./App";
import { Button } from "./Button";
import {useState} from "react";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    //changeFilter: (filter: FilterValuesType) => void
}


export function Todolist({ tasks, title, removeTask}: TodolistPropsType) {
    const [filter, setFilter] = useState<FilterValuesType>('all')
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const getFilteredTasks = (allTasks: TaskType[], filterValue: FilterValuesType): TaskType[] => {
        switch (filterValue) {
            case 'active':
                return allTasks.filter(t => t.isDone === false)
            case 'completed':
                return allTasks.filter(t => t.isDone === true)
        }
        return allTasks
    }

    const filteredTasks: TaskType[] = getFilteredTasks(tasks, filter)

    const taskslist: JSX.Element = filteredTasks.length === 0
        ? <span>Your taskslist is empty</span>
        : <ul>
            {
                filteredTasks.map(task => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone} />
                            <span>{task.title}</span>
                            <Button title={'x'} onClickHandler={() => removeTask(task.id)}/>
                            {/*<button onClick={ () => removeTask(task.id) }>x</button>*/}
                        </li>
                    )
                })
            }
        </ul>

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input />
                <Button title="+" />
            </div>
            {taskslist}
            <div>
                <Button title="All" onClickHandler={() => changeFilter('all')}/>
                <Button title="Active" onClickHandler={() => changeFilter('active')}/>
                <Button title="Completed" onClickHandler={() => changeFilter('completed')}/>
            </div>
        </div>
    );
}