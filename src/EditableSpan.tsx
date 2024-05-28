import React, {ChangeEvent, useState} from "react";

type EditableSpanProps = {
    title: string
    onChange: (newTitle: string) => void

}

export const EditableSpan = ({title, onChange}: EditableSpanProps) => {
    const [editMode, setEditMode] = useState(false)
    const [titleValue, setTitleValue] = useState('')
    const activateEditMode = () => {
        setEditMode(true)
        setTitleValue(title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        onChange(titleValue)
    }
const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitleValue(e.currentTarget.value)




    return (
        editMode
            ? <input onBlur={activateViewMode} onChange={ onChangeTitleHandler } value={titleValue} autoFocus/>
            : <span onDoubleClick={activateEditMode}>{title}</span>
    );
};