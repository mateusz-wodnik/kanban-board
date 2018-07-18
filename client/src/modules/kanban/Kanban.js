import React from 'react';
import { connect } from 'react-redux';
import Lanes from '../lane/Lanes';
import { createLane } from '../lane/LaneActions';

class Kanban extends React.Component {
	render() {
		return (
			<div className="kanban">
				<Lanes lanes={this.props.lanes} userId={this.props.userId} isEditor={this.props.location.pathname === '/board-editor'}/>
			</div>
		)
	}
}

// Kanban.need = [() => getKanbansRequest() ]

const mapStateToProps = state => ({
	lanes: state.lanes,
	userId: state.user._id
})

const mapDispatchToProps = {
	createLane
}

export default connect(mapStateToProps, mapDispatchToProps)(Kanban);
