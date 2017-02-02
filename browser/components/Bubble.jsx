import React, { Component } from 'react';
import { connect } from 'react-redux';

class Bubble extends Component {
  
  render() {
    const { relationship } = this.props;
    return (
      <div>
        <h3>BUBBLE!</h3>
        <p>Name: {relationship.name}</p>
        <p>Type: {relationship.type}</p>
        <p>Score: {relationship.score}</p>
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
