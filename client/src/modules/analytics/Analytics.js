import React from 'react';
import {
	BarChart, Bar,
	PieChart, Pie,
	XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell,
} from 'recharts'
import './Analytics.css'


const Analytics = ({ lanes, priority, date }) => (
	<section className="analytics">
		<div className="card notes-share">
				<LanesChart data={lanes}/>
				<div className="card-body">
					<h5 className="card-title">Notes share in lanes</h5>
				</div>
		</div>
		<div className="card notes-priority">
			<PriorityChart data={priority}/>
			<div className="card-body">
				<h5 className="card-title">Notes priority</h5>
			</div>
		</div>
		<div className="card notes-timeline">
			<div className="card-body">
				<h5 className="card-title">Timeline</h5>
			</div>
			<TimeLineChart data={date}/>
		</div>
	</section>
)

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
)

const TimeLineChart = ({data}) => (
	<BarChart width={2000} height={300} data={data} layout='vertical'
						margin={{top: 5, right: 30, left: 20, bottom: 5}}>
		<CartesianGrid strokeDasharray="3 3"/>
		<XAxis orientation="top" type='number' tickCount={50} tickFormatter={(tick) => Math.round(tick / 24) }/>
		<YAxis type='category' dataKey="name"/>
		<Tooltip/>
		<Bar dataKey="hours" fill="#8884d8" />
	</BarChart>
)

export default Analytics

