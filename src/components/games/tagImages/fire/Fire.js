import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './index.css';

const Fire = (props) => {
    const { name, value, selected, onCheck } = props

    return (
        <div class="fire" onClick={() => onCheck(name, value)} >
            <div class="fire-left">
                <div class="main-fire"></div>
                <div class="particle-fire"></div>
            </div>
            <div class="fire-main">
                <div class="main-fire"></div>
                <div class="particle-fire"></div>
            </div>
            <div class="fire-right">
                <div class="main-fire"></div>
                <div class="particle-fire"></div>
            </div>
            <div class="fire-bottom">
                <div class="main-fire"></div>
            </div>
            <button className={ selected ? "title-pressed" : "title" }  >
                <h5 >
                    {value}
                </h5>
            </button>
        </div>
    );
}
 
export default Fire;