type ButtonPropsType = {
    title: string
    onClickHandler?: () => void
    disabled?: boolean
    classes?: string
}

export function Button({title, onClickHandler, disabled, classes}: ButtonPropsType) {
    return (
        <button className={classes}
                onClick={onClickHandler}
                disabled={disabled}
        >
            <span>{title}</span>
        </button>
    )
}