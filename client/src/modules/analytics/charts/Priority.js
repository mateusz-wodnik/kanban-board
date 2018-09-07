import React from 'react';
import {
	PieChart,
	Pie,
	Tooltip,
	Legend,
	Cell,
} from 'recharts';

const PriorityChart = ({data}) => (
	<PieChart className="chart" width={400} height={300}>
		<Tooltip/>
		<Pie
			data={data}
			dataKey='notes'
			innerRadius={0} outerRadius={80}
			fill="#82ca9d"
			labelLine={false}
			label
		>
			{data.map((note, idx) => (
				<Cell value={1} key={idx} fill={note.color}></Cell>
			))}
		</Pie>
		<Legend layout={'vertical'} align={'left'} verticalAlign={'middle'}/>
	</PieChart>
);

export default PriorityChart;
