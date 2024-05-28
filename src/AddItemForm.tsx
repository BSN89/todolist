import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormProps = {

    addItem: (title: string) => void
}

export const AddItemForm = ({ addItem}: AddItemFormProps) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(event.currentTarget.value)
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === "Enter") {
            addItem(newTaskTitle);
        }
    }
    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '')
            addItem(newTaskTitle.trim());
        setNewTaskTitle('')
        setError('Title is required')

    }

    return (
        <div>
            <input value={newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};