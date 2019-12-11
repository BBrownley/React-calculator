import React from "react"

function Operator(props) {
    return (
        <div className="operator" onClick={props.handleClick}>{props.value}</div>
    )
}

export default Operator