import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton'; 
import { postRelationship, toggleRelExistsError } from './add-relationship.reducer';
import { CirclePicker } from 'react-color';
import BubbleGraphicStatic from '../../BubbleGraphicStatic';

class AddRelationshipForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: 'family',
      color: 'steelblue'
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.addRelationship = this.addRelationship.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  componentDidUpdate() {
    const self = this;
    if (this.props.toggleError) {
      setTimeout(function () {
        self.props.toggleError(false);
      }, 5000);
    }
  }

   handleNameChange(event) {
     this.setState( {name: event.target.value } );
   }

   addRelationship() {
     let relationshipInfo = {
       userId: this.props.loggedInUser.id,
       name: this.state.name,
       type: this.state.type,
       color: this.state.color,
       score: 10
     };
     console.log(relationshipInfo)
     this.props.addRelationship(relationshipInfo);
   }

   handleColorChange(color, event) {
    event.preventDefault();
    this.setState( { color: color.hex } );
   }

  render() {
    const { addRelationshipError } = this.props;
    return (
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s10" onChange={this.handleNameChange}>
              <input id="first_name" type="text" className="validate" />
              <div>Pick a color </div>
              <CirclePicker onChange={this.handleColorChange} />
              <label htmlFor="first_name">Name or Nickname (example: Mom, Aunt Linda, Ryan)</label>
              { addRelationshipError ? <div>A contact with that name already exists</div> : ''}
              <RaisedButton className="btn-margin" onClick={this.addRelationship} label="Add" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */
const mapStateToProps = ( { loggedInUser, addRelationshipError} ) => {
	return {
    loggedInUser,
    addRelationshipError
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
