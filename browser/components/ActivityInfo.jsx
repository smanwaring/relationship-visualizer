import React, { Component } from 'react';
import { connect } from 'react-redux';

class ActivityInfo extends Component {
  
  render() {
    const { activities, selectedRelationship } = this.props;
    return (
      <div className="container">
        <div className="row">
        <h3>{selectedRelationship.name}</h3>
        {
          activities.map((activity, i) => (
            <div key={i} className="col l4 m6 s12">
              <p>Type: {activity.type}</p>
              <p>Date: {activity.date}</p>
              <p>Score: {activity.score}</p>
            </div>
          ))
        }
        </div>
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

function mapStateToProps({activities, selectedRelationship}){
	return {
    activities, 
    selectedRelationship
	};
}

function mapDispatchToProps(dispatch){
	return {
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ActivityInfo);
