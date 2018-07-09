import React from 'react';
import {
	BarChart, Bar,
	PieChart, Pie,
	XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell
} from 'recharts'

// const {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;
const elo = [
	{name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
	{name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
	{name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
	{name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
	{name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
	{name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
	{name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];



const Analytics = ({lanes, priority }) => (
	<section className="analytics">
		<button
			onClick={() => console.log(priority)}
			className="btn"
		>Log data</button>
		<Lanes data={lanes}/>
		<Priority data={priority}/>
	</section>
)

const Lanes = ({data}) => (
	<BarChart width={600} height={300} data={data}>
		<XAxis dataKey="name"/>
		<Tooltip formatter={(val, name, props) => {
			if(name === 'notes') {
				name = 'Notes number'
				return val += '%'
			}
			if(name === 'notesNumber') return name = 'Notes number'
		}}/>
		<Bar dataKey="notes">
			{data.map((lane, index) => (
				<Cell fill={lane.color}/>
			))}
		</Bar>
	</BarChart>
)


const Priority = ({data}) => (
	<PieChart width={600} height={300}>
		<Pie
			data={data}
			cx={500} cy={200}
			innerRadius={40} outerRadius={80}
			fill="#82ca9d"
			label
		>
			{data.map((note, index) => (
				<Cell fill={'blue'}/>
			))}
		</Pie>
		<Tooltip/>
	</PieChart>
)

export default Analytics

