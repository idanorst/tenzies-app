import React from 'react'
import '../style.css'

export default function Die(props) {
    // Creating a style which are checking wether the die is held or not.
    const style = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    // Creation of all the different die elements. Which element that is shown is decided by the value of the die. 
    return (
        <div>
            {props.value === 1 && 
            <div 
                // The die element's classnames are decided by the values of the different props. 
                className={`dice first-face ${!props.isHeld && props.clicked && 'rotate'} ${props.tenzies && 'not-clickable'}`}
                style={style}
                onClick={() => props.holdDice(props.id)}
            >
                <span className="dot"></span>
            </div>}
            {props.value === 2 && 
            <div 
                className={`dice second-face ${!props.isHeld && props.clicked && 'rotate'} ${props.tenzies && 'not-clickable'}`}
                style={style}
                onClick={() => props.holdDice(props.id)}
            >
                <span className="dot"></span>
                <span className="dot"></span>
            </div>} 
            {props.value === 3 && 
            <div 
                className={`dice third-face ${!props.isHeld && props.clicked && 'rotate'} ${props.tenzies && 'not-clickable'}`}
                style={style}
                onClick={() => props.holdDice(props.id)}
            >
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>}
            {props.value === 4 && 
            <div 
                className={`dice fourth-face ${!props.isHeld && props.clicked && 'rotate'} ${props.tenzies && 'not-clickable'}`}
                style={style}
                onClick={() => props.holdDice(props.id)}
            >
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>}
            {props.value === 5 && 
            <div 
                className={`dice fifth-face ${!props.isHeld && props.clicked && 'rotate'} ${props.tenzies && 'not-clickable'}`}
                style={style}
                onClick={() => props.holdDice(props.id)}
            >
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
                <div className='column'>
                    <span className="dot"></span>
                </div>
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>}
            {props.value === 6 &&
            <div 
                className={`dice sixth-face ${!props.isHeld && props.clicked && 'rotate'} ${props.tenzies && 'not-clickable'}`}
                style={style}
                onClick={() => props.holdDice(props.id)}
            >
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
                <div className="column">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>}
        </div>
    )
}