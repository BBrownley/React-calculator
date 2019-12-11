//C:\Users\brend\OneDrive\Documents\Webdev

import React from "react"

import Display from "./Display"
import ClearButton from "./ClearButton"

import NumberButtons from "./NumberButtons"
import Operators from "./Operators"

class Calculator extends React.Component {
    constructor() {
        super();
        this.state = {
            calculatorValue: "0",
            equation: "",
            operatorEnabled: false,
            valueHasDecimal: false,
            solved: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {

        const input = event.target.innerText.toString();

        if (input === "Clear") {
            this.clearCalculator();
        } 
        
        else if (
            input === "/" ||
            input === "x" ||
            input === "-" ||
            input === "+") {
                
            this.setOperator(input);
        }

        else if (input === "=") {
            this.calculate();
        }
        
        else if (input === ".") {
            this.addDecimal();
        }

        else {
            this.concatNumber(input);
        }

    }

    clearCalculator() {
        this.setState({
            calculatorValue: "0",
            equation: "",
            operatorEnabled: false,
            valueHasDecimal: false,
            solved: false
        })
    }

    setOperator(input) {

        if (!this.state.operatorEnabled) {
            this.setState(prevState => {

                let valueToInsert = prevState.calculatorValue;
    
                console.log(valueToInsert[prevState.calculatorValue.length-1])
    
                if (valueToInsert[prevState.calculatorValue.length-1] === ".") {
                    valueToInsert = prevState.calculatorValue.substring(0, valueToInsert.length-1)
                    console.log(valueToInsert)
                }
    
                return {
                    equation: " " + prevState.equation + valueToInsert + " " + input + " ",
                    operatorEnabled: true
                }
            })
        }

    }

    calculate() {
        const equation = this.state.equation + this.state.calculatorValue;

        let equationAsArray = equation.split(" ").filter(element => {
            return element !== "";
        })

        let answer;

        //Equation is a number only
        if (equationAsArray.length === 1) {
            answer = equationAsArray[0]
        }
        
        if (equationAsArray.length > 3) {
            //Multiply/Divide
            for (let i = 0; i < equationAsArray.length; i++) {
                if (equationAsArray[i] === "x") {
                    const result = parseFloat(equationAsArray[i-1]) * parseFloat(equationAsArray[i+1])
                    equationAsArray = equationAsArray.slice(0, i-1).concat([result]).concat(equationAsArray.slice(i+2, equationAsArray.length));
                } else if (equationAsArray[i] === "/") {
                    const result = parseFloat(equationAsArray[i-1]) / parseFloat(equationAsArray[i+1])
                    equationAsArray = equationAsArray.slice(0, i-1).concat([result]).concat(equationAsArray.slice(i+2, equationAsArray.length));
                }
            }

            //Add/subtract
            for (let i = 0; i < equationAsArray.length; i++) {
                if (equationAsArray[i] === "+") {
                    const result = parseFloat(equationAsArray[i-1]) + parseFloat(equationAsArray[i+1])
                    equationAsArray = equationAsArray.slice(0, i-1).concat([result]).concat(equationAsArray.slice(i+2, equationAsArray.length));
                } else if (equationAsArray[i] === "-") {
                    const result = parseFloat(equationAsArray[i-1]) - parseFloat(equationAsArray[i+1])
                    equationAsArray = equationAsArray.slice(0, i-1).concat([result]).concat(equationAsArray.slice(i+2, equationAsArray.length));
                }
            }
        }

        //equation is now in the form of two numbers seperated by an operator

        switch(equationAsArray[1]) {
            case "+":
                answer = parseFloat(equationAsArray[0]) + parseFloat(equationAsArray[2]);
                break;
            case "-":
                answer = parseFloat(equationAsArray[0]) - parseFloat(equationAsArray[2]);
                break;
            case "x":
                answer = parseFloat(equationAsArray[0]) * parseFloat(equationAsArray[2]);
                break;
            default:
                answer = parseFloat(equationAsArray[0]) / parseFloat(equationAsArray[2]);
                break;
        }

        this.setState({
            equation: "",
            calculatorValue: answer,
            solved: true
        })

    }

    addDecimal() {
        this.setState(prevState => {
              
            if (prevState.operatorEnabled || prevState.solved) {
                return {
                    calculatorValue: "0.",
                    valueHasDecimal: true,
                    operatorEnabled: false,
                    solved: false
                }
            } else if (!prevState.valueHasDecimal) {
                return {
                    calculatorValue: prevState.calculatorValue + ".",
                    valueHasDecimal: true
                }
            } 

        })
    }

    concatNumber(input) {
        this.setState(prevState => {

            if (prevState.calculatorValue === "0" || prevState.operatorEnabled || prevState.solved) {
                return {
                    calculatorValue: "" + input,
                    operatorEnabled: false,
                    valueHasDecimal: false,
                    solved: false
                }
            }

            return {
                calculatorValue: "" + prevState.calculatorValue + input
            }
        })
    }

    render() {
        return (
            <div className="calculator">
                <Display calculatorValue={this.state.calculatorValue.toString()} equation={this.state.equation} />
                <div className="button-container">
                    <div className="left-col">
                        <ClearButton handleClick={this.handleClick} />
                        <NumberButtons handleClick={this.handleClick}/>
                    </div>
                    <div className="right-col">
                        <Operators handleClick={this.handleClick} />
                    </div>
                </div>         
            </div>
        )
    }

}

export default Calculator;