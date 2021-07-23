import React, {} from 'react';
import './firePoints.css';
import TooltipMaterial from '@material-ui/core/Tooltip';

const FirePoints = (props) => {
    const { firePoints } = props

    return (
        <TooltipMaterial
            title={<span className="tooltip-tagImage" >
                        Fire Points
                    </span>}
            placement="right"
        >
            <div className="fire-points" >
                <div className="fire-left-points">
                    <div className="main-fire-points"></div>
                    <div className="particle-fire-points"></div>
                </div>
                <div className="fire-main-points">
                    <div className="main-fire-points"></div>
                    <div className="particle-fire-points"></div>
                </div>
                <div className="fire-right-points">
                    <div className="main-fire-points"></div>
                    <div className="particle-fire-points"></div>
                </div>
                <div className="fire-bottom-points">
                    <div className="main-fire-points"></div>
                </div>
                <button className="title-points" >
                    <h6 >
                        {firePoints}
                    </h6>
                </button>
            </div>
        </TooltipMaterial>
    );
}
 
export default FirePoints;