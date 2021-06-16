import React, { useEffect } from 'react';
import './help.css';
const Help = () => {
    useEffect(() => {
        console.log(2)
    }, [])
    return (
        <div className="main-help" style={{ top: "0%" }} >
            <div className="text-content" >
                <p className="no-content" > Se encuentra en desarrollo </p>
            </div>
        </div>
    );
}
 
export default Help;