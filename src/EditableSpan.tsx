import React, {ChangeEvent, useState} from 'react';

type EditableSpanProps = {
    value: string
    onChange: (title: string) => void
}

export const EditableSpan = ({value, onChange}: EditableSpanProps) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const activateEditModeHandler = () => {
        setEditMode(true)
    }
    const deActivateEditModeHandler = () => {
        setEditMode(false)
        onChange(title)
    }
    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement> ) => {
        setTitle(e.currentTarget.value)
    }


    return (
        <>
            {editMode
                ? <input onChange={changeTitleHandler} value={title} onBlur={deActivateEditModeHandler} autoFocus/>
                : <span onDoubleClick={activateEditModeHandler}>{value}</span>
            }
        </>
    )
}