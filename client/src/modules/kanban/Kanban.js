import React from 'react';
import { connect } from 'react-redux';
import Lanes from '../lane/Lanes';
import { createLane } from '../lane/LaneActions';
import { editStart } from '../_edit/EditActions';

class Kanban extends React.Component {
	// componentDidMount() {
	// 	this.props.location.pathname === '/board-editor' ? this.props.editStart(true) : this.props.editStart(false)
	// }
	//
	// componentWillUnmount() {
	// 	this.props.editStart(false)
	// }

	render() {
		return (
			<div className="kanban">
				<Lanes lanes={this.props.lanes}/>
			</div>
		)
	}
}

// Kanban.need = [() => getKanbansRequest() ]

const mapStateToProps = state => ({
	lanes: state.lanes
})

const mapDispatchToProps = {
	createLane,
	editStart
}

export default connect(mapStateToProps, mapDispatchToProps)(Kanban);
