import React from 'react';
import {
	BarChart, Bar,
	PieChart, Pie,
	XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell
} from 'recharts'

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
			{data.map((lane, idx) => (
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
			{data.map((note, idx) => {
				console.log(note)
				return <Cell key={idx} fill={note.color}/>
			}
			)}
		</Pie>
		<Tooltip/>
	</PieChart>
)

export default Analytics

