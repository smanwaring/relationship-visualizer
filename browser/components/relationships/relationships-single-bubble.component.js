import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { toggleAddActivity }  from '../forms/add-activity/add-activity.reducer';
import AddActivityForm from '../forms/add-activity/add-activity.component';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class SingleRelationship extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleAddActivityOpen = this.handleAddActivityOpen.bind(this);
    this.handleAddActivityClose = this.handleAddActivityClose.bind(this);
  }

  handleAddActivityOpen() {
    this.props.toggleAddActivityModalState(true);
  }

  handleAddActivityClose() {
    this.props.toggleAddActivityModalState(false);
  }

  handleTouchTap(event){
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
    this.handleAddActivityOpen();
  }

render(){
  const { loggedInUser, relationship, relationshipStyle, name, addActivityStatus } = this.props;
  const addActivityActions = [
    <FlatButton
      label="Cancel"
      primary={true}
      keyboardFocused={true}
      onTouchTap={this.handleAddActivityClose}
    />
  ]
  return (
    <div className="bubble-container">
      <div className="bubble-container-center" onTouchTap={this.handleTouchTap}>
        <div>{name}</div>
        <div className="flex-bubble" onTouchTap={this.handleTouchTap} style={relationshipStyle} />
      </div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'middle', vertical: 'center'}}
          targetOrigin={{horizontal: 'middle', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
          animation={PopoverAnimationVertical}
        >
          <Menu>
            <MenuItem primaryText="Add Activity" onTouchTap={this.handleRequestClose} />
            <Link to={`/relationship/user/${loggedInUser.id}/rel/${relationship.id}`}><MenuItem primaryText="View Activity History" /></Link>
            <Link to={`/relationship/user/${loggedInUser.id}/rel/${relationship.id}`}><MenuItem primaryText="Edit" /></Link>
          </Menu>
        </Popover>
        <Dialog
          title="Add an Activity"
          actions={addActivityActions}
          modal={false}
          open={addActivityStatus.showAddActivityModal}
          onRequestClose={this.handleAddActivityClose}
        >
          <AddActivityForm  relationshipId={relationship.id} autoFocus="true" />
        </Dialog>
    </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ( { addActivityStatus } ) => {
	return {
    addActivityStatus
	};
};


const  mapDispatchToProps = (dispatch) => {
  return {
    toggleAddActivityModalState: (bool) => {
      dispatch(toggleAddActivity(bool));
    }
  };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SingleRelationship);



