import React, {} from 'react';
import './index.css';

const Fire = (props) => {
    const { name, value, selected, onCheck } = props

    return (
        <div className="fire" onClick={() => onCheck(name, value)} >
            <div className="fire-left">
                <div className="main-fire"></div>
                <div className="particle-fire"></div>
            </div>
            <div className="fire-main">
                <div className="main-fire"></div>
                <div className="particle-fire"></div>
            </div>
            <div className="fire-right">
                <div className="main-fire"></div>
                <div className="particle-fire"></div>
            </div>
            <div className="fire-bottom">
                <div className="main-fire"></div>
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