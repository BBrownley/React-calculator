import React from "react"

function NumberButton(props) {
    if (props.shape === "square") {
        return (
            <div className="number-button number-button-square" onClick={props.handleClick}>
                {props.value}
            </div>
        )
    } else {
        return (
            <div className="number-button number-button-rectangle" onClick={props.handleClick}>
                {props.value}
            </div>
        )
    }
}

export default NumberButton;