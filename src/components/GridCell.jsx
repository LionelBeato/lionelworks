import React from 'react';

const GridCell = ({className, children}) => {

    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default GridCell;