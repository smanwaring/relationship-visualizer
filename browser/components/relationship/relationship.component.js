import React, { Component } from 'react';
import { connect } from 'react-redux';
import Bubble from '../relationship-bubble/relationship-bubble.component';
import { incrementScore } from '../relationships/relationships.reducer';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import AddActivityForm from '../forms/add-activity/add-activity.component';
import ChangeColor from '../forms/change-color/change-color.component';

/* -----------------    COMPONENT     ------------------ */
class Relationship extends Component {
 constructor(props) {
    super(props);
    this.state = {
      addActivityOpen: false,
      colorPickerOpen: false
    }
    this.handleAddActivityOpen = this.handleAddActivityOpen.bind(this);
    this.handleAddActivityClose = this.handleAddActivityClose.bind(this);
    this.handleColorPickerOpen = this.handleColorPickerOpen.bind(this);
    this.handleColorPickerClose = this.handleColorPickerClose.bind(this);
  }

  handleAddActivityOpen() {this.setState({ addActivityOpen: true })};
  handleAddActivityClose() {this.setState({ addActivityOpen: false })};
  handleColorPickerOpen() {
    this.setState({ colorPickerOpen: true });
  }

  handleColorPickerClose() {this.setState({ colorPickerOpen: false })}

  render() {
    const addActivityActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleAddActivityClose}
      />
    ]
    const chooseColorActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleColorPickerClose}
      />
    ]
    const { selectedRelationship, loggedInUser, incrementScoreProp} = this.props;
    const { colorPickerModalStyle } = style;
    const relationshipStyle = {
      background: selectedRelationship.color,
      width: selectedRelationship.score,
      height: selectedRelationship.score
    };
    return (
      <div>
        <Bubble name={selectedRelationship.name} relationshipStyle={relationshipStyle} />
        <Link to={`/relationship/${selectedRelationship.id}/activities`}>
          <RaisedButton label="View Activities" primary={true} />
        </Link>
        <RaisedButton label="Add Activity" secondary={true} onTouchTap={this.handleAddActivityOpen} id="addActivity"/>
          <Dialog
            title="Add an Activity"
            actions={addActivityActions}
            modal={false}
            open={this.state.addActivityOpen}
            onRequestClose={this.handleAddActivityClose}
          >
            <AddActivityForm relationshipId={selectedRelationship.id} autoFocus="true"/>
          </Dialog>
          <RaisedButton label="Change Color" primary={true} onTouchTap={this.handleColorPickerOpen}/>
          <Dialog
            title="Choose a Color"
            actions={chooseColorActions}
            modal={false}
            open={this.state.colorPickerOpen}
            onRequestClose={this.handleColorPickerClose}
            contentStyle={colorPickerModalStyle}
          >
            <div className="row">
              <div className="col s12">
                <ChangeColor
                  relationshipId={this.props.selectedRelationship.id} 
                  autoFocus="true"
                  handleClose={this.handleColorPickerClose}
                />
              </div>
            </div>
          </Dialog>
      </div>
    );
  }

}

const style = {
  colorPickerModalStyle: {
    width: '30em'
  }
};




/* -----------------    CONTAINER     ------------------ */
const mapStateToProps = ( { selectedRelationship, loggedInUser } ) => {
	return {
    selectedRelationship,
    loggedInUser
	};
};

const  mapDispatchToProps = (dispatch) => {
  return {
    incrementScoreProp: (relationship, loggedInUser) => dispatch(incrementScore(relationship, loggedInUser))
  };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Relationship);
