import React from 'react';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from 'recharts';

const CustomBarChart = ({data}) => {

    //function to alternate colors
    const getBarColor = (index) => {
        return index % 2 === 0 ? "#875cf5" : "#cfbefb";
    };

    const CustomTooltip = ({active, payload}) => {
        if(active && payload && payload.length) {
            // Detect if this is income data (has month) or expense data (has category)
            const dataKey = payload[0].payload.month ? "month" : "category";
            const label = payload[0].payload.month ? "Month" : "Category";
            
            return (
                <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300">
                    <p className="text-xs font-semibold text-purple-800 mb-1">
                        {label}: {payload[0].payload[dataKey]}
                    </p>
                    <p className="text-sm text-gray-600">
                        Amount: <span className="text-sm font-medium text-gray-900">
                            ${payload[0].payload.amount}
                        </span>
                    </p>
                </div>
            );
        }
        return null;
    };

    // Don't render if no data
    if (!data || data.length === 0) {
        return (
            <div className="bg-white mt-6 p-8 text-center text-gray-500">
                <p>No data available</p>
            </div>
        );
    }

    // Determine the correct dataKey based on data structure
    const dataKey = data[0]?.month ? "month" : "category";

    return (
        <div className="bg-white mt-6">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke="none" />
                    <XAxis dataKey={dataKey} tick={{fontSize: 12, fill: "#555"}}/>
                    <YAxis tick={{fontSize: 12, fill: "#555"}} stroke="none"/>
                    <Tooltip content={CustomTooltip}/>

                    <Bar
                        dataKey="amount"
                        fill="#FF8042"
                        radius={[10,10,0,0]}
                        activeDot={{ r: 8, fill: "yellow"}}
                        activeStyle={{fill: "green"}}
                        barCategoryGap={10}
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={getBarColor(index)}/>
                        ))}
                    </Bar>
                    <Legend />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomBarChart;