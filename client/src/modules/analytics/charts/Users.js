import React from 'react';
import {
	PieChart,
	Pie,
	Legend,
	Cell
} from 'recharts';

const UsersChart = ({data}) => (
	<PieChart className="chart" width={400} height={300}>
		<Pie startAngle={180}
				 dataKey={'value'}
				 endAngle={0}
				 data={data}
				 innerRadius={0} outerRadius={80}
				 fill="#8884d8" label
		>
			{data.map((user, idx) => (
				<Cell key={idx} fill={idx === 0 ? '#000' : '#999'}/>
			))}
		</Pie>
		<Legend layout={'vertical'} align={'left'} verticalAlign={'middle'}/>
	</PieChart>
);

export default UsersChart;
