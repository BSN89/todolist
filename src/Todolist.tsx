import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {useState, KeyboardEvent, ChangeEvent} from "react";
import classes from "*.module.css";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
    //changeFilter: (filter: FilterValuesType) => void
}


export function Todolist({tasks, title, removeTask, addTask, changeTaskStatus}: TodolistPropsType) {
    const [filter, setFilter] = useState<FilterValuesType>('all')
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>('')


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
        const trimmedTaskTitle = taskTitle.trim()
        if(trimmedTaskTitle !== ''){
            addTask(taskTitle)
        }else{
            setError('Title is required')
        }
        setTaskTitle("")
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        setTaskTitle(event.currentTarget.value)

    }
    const isButtonDisabled = taskTitle.length === 0 || taskTitle.trim().length>= 15

    const addTaskOnKeyUpHandler = taskTitle.length === 0 ? undefined : (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()
    const taskslist: JSX.Element = filteredTasks.length === 0
        ? <span>Your taskslist is empty</span>
        : <ul>
            {
                filteredTasks.map(task => {
                    const removeTaskHandler = () => removeTask(task.id)
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
                        changeTaskStatus(task.id, e.currentTarget.checked)
                    return (

                        <li key={task.id}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={ changeTaskStatusHandler }
                            />
                            <span className={task.isDone ? 'task-done' : 'task'}>{task.title}</span>
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

                <input className={error ? 'task-input-error' : ''}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                />

                <Button
                    title="+"
                    onClickHandler={addTaskHandler}
                    disabled={isButtonDisabled}
                />

                {taskTitle.trim().length >= 10 && taskTitle.length <= 15 && <div> не более 10 символов</div>}
                {error && <div style={{color: 'red'}}>{error}</div>}
                {taskTitle.trim().length> 15 && <div style={{color: 'red'}}>This to long</div>}
            </div>
            {taskslist}
            <div>
                <Button title="All"
                    onClickHandler={() => changeFilter('all')}
                    classes={filter === 'all' ? 'btn-filter-active' : ''}
                />
                <Button title="Active"
                        onClickHandler={() => changeFilter('active')}
                        classes={filter === 'active' ? 'btn-filter-active' : ''}
                />
                <Button title="Completed"
                        onClickHandler={() => changeFilter('completed')}
                        classes={filter === 'completed' ? 'btn-filter-active' : ''}
                />
            </div>
        </div>
    );
}