import React from "react"

import Operator from "./Operator"

function Operators(props) {
    const values = ["/", "x", "-", "+", "="];

    return (
        <div>
            {
                values.map((value, index) => {
                    return <Operator value={value} key={index} handleClick={props.handleClick}/>
                })
            }
        </div>
    )
}

export default Operators