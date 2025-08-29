import React from 'react';

//active tells you when the tooltip should be visable
//payload is the data that is being displayed in the tooltip

const CustomToolTip = ({active, payload}) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300">
                <p className="text-xs font-semibold text-purple-800 mb-1">
                    {payload[0].name}
                </p>
                <p className="text-sm text-gray-600">
                   Amount: 
                   <span className="text-sm font-medium text-gray-900">
                    ${payload[0].value}
                   </span> 
                </p>
            </div>
        );
    }
    return null;
}

export default CustomToolTip;