import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddActivityForm extends Component {
  
  render() {
    return (
      <div>
        <h1>ADD FORM GOES HERE</h1>
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
)(AddActivityForm);
