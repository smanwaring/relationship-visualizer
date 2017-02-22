import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import AddActivityForm from './forms/AddActivityForm';
import ChangeColor from './forms/ChangeColor';
import BubbleGraphicStatic from './BubbleGraphicStatic';
import { animateBubbles, expandBubble } from '../d3/bubbleD3';


class BubbleMenu extends Component {
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
    console.log("YO YO YO")
    expandBubble(this.props.relationship);
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
    const { relationship, loggedInUser, incrementScore } = this.props;
    const { colorPickerModalStyle } = style;
    return (
      <div>
        <Link to={`/relationship/${relationship.id}/activities`}>
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
            <AddActivityForm relationshipId={relationship.id} autoFocus="true"/>
          </Dialog>
          <RaisedButton 
            label="Increment Score" 
            onTouchTap={() => incrementScore(relationship, loggedInUser)} />  
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
                  relationshipId={this.props.relationship.id} 
                  autoFocus="true"
                  handleClose={this.handleColorPickerClose}
                />
              </div>
              <div className="col s12">
                <BubbleGraphicStatic
                  relationship={relationship}
                />
              </div>
            </div>
          </Dialog>
      </div>
    )
  }

}



export default BubbleMenu;

const style = {
  colorPickerModalStyle: {
    width: "30em"
  }
}

/* -----------------    CONTAINER     ------------------ */

