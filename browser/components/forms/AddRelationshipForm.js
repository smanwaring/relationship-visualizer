import React, { Component } from 'react';
import { connect } from 'react-redux'; 

class AddRelationshipForm extends Component {


  render() {
    return (
      <div>
        <h4>ADD RELATIONSHIP GOES HERE</h4>
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
)(AddRelationshipForm);
