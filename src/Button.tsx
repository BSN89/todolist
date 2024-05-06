

type ButtonPropsType = {
    title: string
    onClickHandler?: () => void
    disabled?: boolean
}

export function Button({title, onClickHandler, disabled}:ButtonPropsType) {
    return (
        <button onClick={onClickHandler}
                disabled={disabled}
        >
            <span>{title}</span>
        </button>
    )
}