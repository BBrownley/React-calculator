import React from "react"

import NumberButton from "./NumberButton"

function NumberButtons(props) {
    const values = [7,8,9,4,5,6,1,2,3,0,"."];

    return (
        <div>
            {        
            values.map((value, index) => {
                    if (value === 0) {
                        return <NumberButton shape="rectangle" value={value} handleClick={props.handleClick} key={index}/>
                    } else {
                        return <NumberButton shape="square" value={value} handleClick={props.handleClick} key={index}/>
                    }
                })
            }
        </div>
    )
}

export default NumberButtons;