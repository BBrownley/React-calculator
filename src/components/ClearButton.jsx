import React from "react"

function ClearButton(props) {
    return (
        <button onClick={props.handleClick} className="clear-button">Clear</button>
    )
}

export default ClearButton;