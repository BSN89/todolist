import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {useState, KeyboardEvent, ChangeEvent} from "react";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    //changeFilter: (filter: FilterValuesType) => void
}


export function Todolist({tasks, title, removeTask, addTask}: TodolistPropsType) {
    const [filter, setFilter] = useState<FilterValuesType>('all')
    const [taskTitle, setTaskTitle] = useState('')


    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const getFilteredTasks = (allTasks: TaskType[], filterValue: FilterValuesType): TaskType[] => {
        switch (filterValue) {
            case 'active':
                return allTasks.filter(t => !t.isDone)
            case 'completed':
                return allTasks.filter(t => t.isDone)
        }
        return allTasks
    }

    const filteredTasks: TaskType[] = getFilteredTasks(tasks, filter)


    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle("")
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => setTaskTitle(event.currentTarget.value)
    const isButtonDisabled = taskTitle.length === 0 || taskTitle.length > 15

const addTaskOnKeyUpHandler = taskTitle.length === 0 ? undefined : (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()
    const taskslist: JSX.Element = filteredTasks.length === 0
        ? <span>Your taskslist is empty</span>
        : <ul>
            {
                filteredTasks.map(task => {
                    const removeTaskHandler = () => removeTask(task.id)
                    return (

                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <Button title={'x'} onClickHandler={removeTaskHandler}/>
                        </li>

                    )
                })
            }
        </ul>

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>

                <input
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                />

                <Button
                    title="+"
                    onClickHandler={addTaskHandler}
                    disabled={isButtonDisabled}
                />

                {taskTitle.length > 10 && <div> не более 10 символов</div>}

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