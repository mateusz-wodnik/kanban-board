import React from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from 'recharts';

const TimeLineChart = ({data}) => (
	<BarChart width={2000} height={300} data={data} layout='vertical'
						margin={{top: 5, right: 30, left: 20, bottom: 5}}>
		<CartesianGrid strokeDasharray="3 3"/>
		<XAxis orientation="top" type='number' tickCount={50} tickFormatter={(tick) => Math.round(tick / 24) }/>
		<YAxis type='category' dataKey="name"/>
		<Tooltip/>
		<Bar dataKey="hours" fill="#8884d8" />
	</BarChart>
);

export default TimeLineChart;
