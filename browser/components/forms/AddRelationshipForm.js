import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton'; 
import { postRelationship } from '../../reducers/relationships';

class AddRelationshipForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      type: "family"
    };
    this.handleChange = this.handleChange.bind(this);
    this.addRelationship = this.addRelationship.bind(this);
  }

   handleChange(event) {
     this.setState( {name: event.target.value } );
   }

   addRelationship(){
     let relationshipInfo = {
       userId: this.props.loggedInUser.id,
       name: this.state.name,
       type: this.state.type,
       color: 'steelblue',
       score: 10
     };
     this.props.addRelationship(relationshipInfo);
   }

  render() {
    const { addRelationship } = this.props;
    return (
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s10" onChange={this.handleChange}>
              <input id="first_name" type="text" className="validate" />
              <label htmlFor="first_name">Name or Nickname (example: Mom, Aunt May, Ryan)</label>
              <RaisedButton onClick={this.addRelationship} label="Add" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

function mapStateToProps( { loggedInUser } ){
	return {
    loggedInUser
	};
}

const  mapDispatchToProps = (dispatch) => {
  return {
    addRelationship: (relationShipInfo) => {
        dispatch( postRelationship(relationShipInfo) );
    }
  }
}



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddRelationshipForm);
