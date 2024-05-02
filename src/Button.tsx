

type ButtonPropsType = {
    title: string
    onClickHandler?: () => void
}

export function Button({title, onClickHandler}:ButtonPropsType) {
    return (
        <button onClick={onClickHandler}>
            <span>{title}</span>
        </button>
    )
}