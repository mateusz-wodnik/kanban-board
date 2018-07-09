import React from 'react';
import {
	BarChart, Bar,
	PieChart, Pie,
	XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell
} from 'recharts'
import './Analytics.css'


const Analytics = ({lanes, priority }) => (
	<section className="analytics">
		<div className="card">
				<LanesChart data={lanes}/>
				<div className="card-body">
					<h5 className="card-title">Card title</h5>
					<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
				</div>
		</div>
		<div className="card">
			<PriorityChart data={priority}/>
			<div className="card-body">
				<h5 className="card-title">Card title</h5>
				<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
			</div>
		</div>
	</section>
)

const LanesChart = ({data, className}) => (
	<BarChart className={`chart ${className}`} width={600} height={300} data={data}>
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


const PriorityChart = ({data}) => (
	<PieChart className="chart" width={600} height={300}>
		<Pie
			data={data}
			innerRadius={0} outerRadius={80}
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

