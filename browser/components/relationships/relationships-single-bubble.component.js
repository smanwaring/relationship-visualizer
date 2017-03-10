import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AddActivityForm from '../forms/add-activity/add-activity.component';
import EditRelationship from '../forms/edit-relationship/edit-relationship.component';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class SingleRelationship extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalOpen: false,
      open: false,
      modalContent: ""
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleAddActivityOpen = this.handleAddActivityOpen.bind(this);
    this.handleAddActivityClose = this.handleAddActivityClose.bind(this);
    this.handleEditActivityOpen = this.handleEditActivityOpen.bind(this);
  }

  handleAddActivityOpen() {
    this.setState({open: false});
    this.setState({ modalOpen: true, modalContent: "add" });
  }

  handleEditActivityOpen() {
    this.setState({open: false});
    this.setState({ modalOpen: true, modalContent: "edit" });
  }

  handleAddActivityClose() {
    this.setState({ modalOpen: false });
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
    this.setState({ open: false });
  }

  renderModalContent() {
    if(this.state.modalContent === "add") {
      return (
        <AddActivityForm 
          handleAddActivityClose={this.handleAddActivityClose}
          relationshipId={this.props.relationship.id} autoFocus="true" />
      )
    } else if(this.state.modalContent === "edit") {
      return (
        <EditRelationship 
          autoFocus="true"
          handleClose={this.handleAddActivityClose}
          relationship={this.props.relationship}
        />
      )
    }
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
        <div className="bubble-container-center vam" onTouchTap={this.handleTouchTap}>
          <p>{name}</p>
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
              <MenuItem primaryText="Add Activity" onClick={this.handleAddActivityOpen} />
              <Link to={`/relationship/user/${loggedInUser.id}/rel/${relationship.id}`}><MenuItem primaryText="View Activity History" /></Link>
              <MenuItem primaryText="Edit Relationship" onClick={this.handleEditActivityOpen} />
            </Menu>
          </Popover>
          <Dialog
            title={`Add an activity for ${relationship.name}`}
            actions={addActivityActions}
            modal={false}
            open={this.state.modalOpen}
            onRequestClose={this.handleAddActivityClose}
          >
            {this.renderModalContent()}
          </Dialog>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = (state) => {
  return {};
};


const  mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SingleRelationship);



