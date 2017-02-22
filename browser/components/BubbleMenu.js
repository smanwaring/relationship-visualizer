import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AddActivityForm from './forms/AddActivityForm';
import Dialog from 'material-ui/Dialog';
import {Link} from 'react-router';


class BubbleMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {this.setState({ open: true })};
  handleClose() {this.setState({ open: false })};

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ]
    console.log("PROPS!!!", this.props);
    const { relationship, loggedInUser, incrementScore } = this.props;
    return (
      <div>
        <Link to={`/relationship/${relationship.id}/activities`}>
          <RaisedButton label="View Activities" primary={true} />
        </Link>
        <RaisedButton label="Add Activity" secondary={true} onTouchTap={this.handleOpen} id="addActivity"/>
          <Dialog
            title="Add an Activity"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <AddActivityForm relationshipId={relationship.id} autoFocus="true"/>
          </Dialog>
          <RaisedButton 
            label="Increment Score" 
            onTouchTap={() => incrementScore(relationship, loggedInUser)} />   
      </div>
    );
  }

}

export default BubbleMenu;

/* -----------------    CONTAINER     ------------------ */
