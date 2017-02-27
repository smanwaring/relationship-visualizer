import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton'; 
import { postRelationship, toggleRelExistsError } from '../../reducers/relationships';

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

  componentDidUpdate() {
    const self = this;
    if (this.props.toggleError) {
      setTimeout(function () {
        self.props.toggleError(false);
      }, 2000);
    }
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
    const { addRelationship, relationshipError } = this.props;
    return (
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s10" onChange={this.handleChange}>
              <input id="first_name" type="text" className="validate" />
              <label htmlFor="first_name">Name or Nickname (example: Mom, Aunt May, Ryan)</label>
              { relationshipError ? <div>A contact with that name already exists</div> : ''}
              <RaisedButton className="btn-margin" onClick={this.addRelationship} label="Add" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */
const mapStateToProps = ( { loggedInUser, relationshipError } ) => {
	return {
    loggedInUser,
    relationshipError
	};
};

const  mapDispatchToProps = (dispatch) => {
  return {
    addRelationship: (relationShipInfo) => {
      dispatch( postRelationship(relationShipInfo) );
    },
    toggleError: (bool) => {
      dispatch(  toggleRelExistsError(bool) );
    }
  };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddRelationshipForm);
