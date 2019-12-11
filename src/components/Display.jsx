import React from "react"

function Display(props) {
    return (
        <div className="display">
            <p className="display-header">{props.equation}</p>
            <p className="display-main">{props.calculatorValue}</p>
        </div>
    )
}

export default Display;