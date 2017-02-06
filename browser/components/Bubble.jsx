import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import AddActivityForm from './forms/AddActivityForm';


class Bubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }

    this.handleOpen = () => {
      this.setState({ open: true })
    }

    this.handleClose = () => {
      this.setState({ open: false })
    }
  }


  
  render() {
    const { relationship } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ]
    return (
      <div>
        <h4>BUBBLE!</h4>
        <p>Name: {relationship.name}</p>
        <p>Type: {relationship.type}</p>
        <p>Score: {relationship.score}</p>
        <Link to={`/relationship/${relationship.id}/activities`}><RaisedButton label="View Activities" primary={true} /></Link>
        <RaisedButton label="Add Activity" secondary={true} onTouchTap={this.handleOpen}/>
          <Dialog
            title="Add an Activity"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <AddActivityForm relationshipId={relationship.id} autoFocus="true"/>
          </Dialog>
        </div>
    )
  }
}


/* -----------------    CONTAINER     ------------------ */

function mapStateToProps(state){
	return {
	};
}

function mapDispatchToProps(dispatch){
	return {
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Bubble);
