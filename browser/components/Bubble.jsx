import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

class Bubble extends Component {
  
  render() {
    const { relationship } = this.props;

    return (
      <div>
        <h4>BUBBLE!</h4>
        <p>Name: {relationship.name}</p>
        <p>Type: {relationship.type}</p>
        <p>Score: {relationship.score}</p>
        <Link to={`/relationship/${relationship.id}/activities`}><RaisedButton label="View Activities" primary={true} /></Link>
        <RaisedButton label="Add Activity" secondary={true}/>
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

function mapStateToProps(state){
	return {
	};
}

function mapDispatchToProps(dispatch){
	return {
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Bubble);
