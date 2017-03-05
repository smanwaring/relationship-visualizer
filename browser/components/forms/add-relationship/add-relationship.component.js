import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { postRelationship, toggleRelExistsError, changeRelationshipAdded } from './add-relationship.reducer';
import { CirclePicker } from 'react-color';
import RelationshipBubble from '../../relationship-bubble/relationship-bubble.component';
import { toggleStateModal } from '../../main-menu/main-menu.reducer';

class AddRelationshipForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: 'family',
      color: '#2196f3'
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.addRelationship = this.addRelationship.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentDidMount(){
    this.props.toggleRelationshipAdded(false);
  }

  componentDidUpdate() {
    const self = this;
    if (this.props.addRelationshipStatus.addRelationshipError) {
      setTimeout(function () {
        self.props.toggleError(false);
      }, 5000);
    }
    if (this.props.addRelationshipStatus.relationshipAdded){
      console.log("should be closing");
      this.handleModalClose();
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
       color: this.state.color
     };
     this.props.addRelationship(relationshipInfo);
   }

   handleColorChange(color, event) {
    event.preventDefault();
    this.setState( { color: color.hex } );
   }

   handleModalClose(){
      this.props.closeAddRelationshipModal('showAddRelationshipModal', false);
   }

  render() {
    const { addRelationshipError } = this.props.addRelationshipStatus;
    const relationshipStyle = {
      background: this.state.color,
      width: 175,
      height: 175
    };
    return (
      <div>
        <form>
          <div className="wrapper">
            <article className="main">
              <RelationshipBubble name={this.state.name} relationshipStyle={relationshipStyle} /> 
            </article>
            <aside className="aside aside-1">
              <div className="input-field" onChange={this.handleNameChange}>
                <input placeholder="Name or Nickname" id="first_name" type="text" className="validate"/>
              </div>
              { addRelationshipError ? <div>A contact with that name already exists</div> : ''}
              <div className="left spacer-sm">CHOOSE A HUE </div>
              <div>
                <CirclePicker onChange={this.handleColorChange } color={this.state.color} />
              </div>
            </aside>
          </div>
          <RaisedButton className="btn-margin" onClick={this.addRelationship} label="Add" />
        </form>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */
const mapStateToProps = ( { loggedInUser, addRelationshipStatus } ) => {
	return {
    loggedInUser,
    addRelationshipStatus
	};
};

const  mapDispatchToProps = (dispatch) => {
  return {
    addRelationship: (relationShipInfo) => {
      dispatch( postRelationship(relationShipInfo) );
    },
    toggleError: (bool) => {
      dispatch( toggleRelExistsError(bool) );
    },
    closeAddRelationshipModal: (str, bool) => {
      dispatch( toggleStateModal(str, bool) );
    },
    toggleRelationshipAdded: (bool) => {
      dispatch( changeRelationshipAdded(bool) );
    }
  };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddRelationshipForm);


          /*<div className="row">
            <div className="input-field col s10" onChange={this.handleNameChange}>
              <input id="first_name" type="text" className="validate" />
              <div>Pick a color </div>
              <CirclePicker onChange={this.handleColorChange } color={this.state.color} />
              <label htmlFor="first_name">Name or Nickname (example: Mom, Aunt Linda, Ryan)</label>
              { addRelationshipError ? <div>A contact with that name already exists</div> : ''}
              <RaisedButton className="btn-margin" onClick={this.addRelationship} label="Add" />
              <RelationshipBubble name={this.state.name} relationshipStyle={relationshipStyle} />
            </div>
          </div>*/