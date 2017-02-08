import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import * as d3 from "d3";
import AddActivityForm from './forms/AddActivityForm';
import { incrementScore } from '../reducers/relationships';
import { animateBubbles } from '../d3/bubbleD3';


class Bubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.handleOpen = () => this.setState({ open: true }) 
    this.handleClose = () => this.setState({ open: false });
    this.addToScore = this.addToScore.bind(this);
  }

  componentDidMount() {
    animateBubbles(this.props.relationship);
  }

  componentDidUpdate() {
    animateBubbles(this.props.relationship);
  }

  addToScore(relationship, user) {
    this.props.incrementScore(relationship, user)
  }


  render() {
    console.log(this.props.relationship.id);
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
        <p>Type: {relationship.type}</p>
        <svg className="circle-container" id={`score${relationship.id}-container`}>
          <circle id={`score${relationship.id}`} style={{"fill": "steelblue"}}></circle>
          <text id={`score${relationship.id}-name`} style={{"fill": "black" }}>{relationship.name}</text>
        </svg>
        <Link to={`/relationship/${relationship.id}/activities`}><RaisedButton label="View Activities" primary={true} /></Link>
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
          <RaisedButton label="Increment Score" onTouchTap={() => this.addToScore(relationship, this.props.loggedInUser)} />            
        </div>
    )
  }
}


/* -----------------    CONTAINER     ------------------ */

function mapStateToProps({ loggedInUser }){
	return {
    loggedInUser
	};
}

const mapDispatchToProps = {
    incrementScore
	};


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Bubble);
