import React from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	Tooltip,
	Cell,
} from 'recharts'

const LanesChart = ({data, className}) => (
	<BarChart className={`chart ${className}`} width={400} height={300} data={data}>
		<XAxis dataKey="name"/>
		<Tooltip formatter={(val, name, props) => {
			if(name === 'notes') {
				name = 'Notes number'
				return val += '%'
			}
			if(name === 'notesNumber') return name = 'Notes number'
		}}/>
		<Bar dataKey="notes">
			{data.map((lane, idx) => <Cell key={idx} fill={lane.color}/>)}
		</Bar>
	</BarChart>
)

export default LanesChart;
