import React, { Component } from 'react';
import { connect } from 'react-redux'; 

class SettingsForm extends Component {


  render() {
    return (
      <div>
        <h4>SETTINGS FORM GOES HERE</h4>
      </div>
    )
  }
}



/* -----------------    CONTAINER     ------------------ */

function mapStateToProps(state){
	return {
    
	};
}

const  mapDispatchToProps = {  };


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SettingsForm);
