import React from 'react';
import CustomToolTip from './CustomToolTip';
import CustomLegend from './CustomLegend';

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from 'recharts';

const CustomPieChart = ({
    data, 
    label, 
    totalAmount, 
    colors, 
    showTextAnchor
}) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <Pie 
                    data={data} 
                    dataKey="amount" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={120} 
                    innerRadius={80}
                    label={false}
                >
                     {data.map((entry,index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                     ))}
                </Pie>

                <Tooltip content={CustomToolTip}/>
                <Legend content={CustomLegend}/>

                {showTextAnchor && (
                    <>
                    <text 
                        x="50%" 
                        y="50%" 
                        dy={-20} 
                        textAnchor="middle" 
                        fill="#666"
                        fontSize="14"
                    >
                        {label}
                    </text>
                    <text
                        x="50%" 
                        y="50%" 
                        dy={10} 
                        textAnchor="middle" 
                        fill="#333"
                        fontSize="20"
                        fontWeight="600"
                    >
                        {totalAmount}
                    </text>
                    </>
                )}
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;