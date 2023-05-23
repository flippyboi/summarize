import React from 'react';

import './typewriter.css';

export const TypewriterAnimated = () => {
    return (
        <div className="typewriter">
            <div className="slide">
                <i></i>
            </div>
            <div className="paper"></div>
            <div className="keyboard"></div>
        </div>
    );
};
