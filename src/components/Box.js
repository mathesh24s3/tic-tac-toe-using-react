import React from "react";

export default function Box( props) {
    return (
        <li className="box"  onClick={(!props.isHeld &&  !props.isGameOver) ? ()=>props.changeTurn(props.id , props.index): ()=>console.log("Already clicked")}>
           <span className="player--symbol"> {props.value}</span>
        </li>
    )
}