import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import Button from '@mui/material/Button';

type AddItemFormProps = {
    addItem: (title: string) => void
}

export const AddItemForm = ( {addItem}: AddItemFormProps ) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const addTaskHandler = () => {
        if(title.trim() !== ''){
            addItem(title.trim())
            setTitle('')
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
    return(

        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyUpHandler}
                className={error ? 'error' : ''}
            />
            <Button variant="contained"  onClick={addTaskHandler}>+</Button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>

      );
    };