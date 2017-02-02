import React, { Component } from 'react';
import { connect } from 'react-redux';

class ActivityInfo extends Component {
  
  render() {
    const { activities, relationship } = this.props;
    return (
      <div>
        {
          activities.map((activity, i) => (
            <div key={i}>
              <p>{activity.type}</p>
              <p>{activity.date}</p>
              <p>{activity.score}</p>
            </div>
          ))
        }
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

function mapStateToProps({activities, relationships}){
	return {
    activities, 
    relationships
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
