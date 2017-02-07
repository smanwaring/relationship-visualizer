import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import * as d3 from "d3";
import AddActivityForm from './forms/AddActivityForm';
import { incrementScore } from '../reducers/relationships';

let fakeData = {
  "1": 10,
  "2": 5,
  "3": 7,
  "4": 2,
  "5": 15
}

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
    this.addToScore = this.addToScore.bind(this);
  }

  componentDidMount() {
    
    d3.select(`#score${this.props.relationship.id}`)
      .transition()
      .delay(2000)
      .duration(500)
      .attr("r", this.props.relationship.score * 4)
      .attr("cx", this.props.relationship.score * 5)
      .attr("cy", this.props.relationship.score * 5)


    d3.select(`#score${this.props.relationship.id}-container`).transition()
      .duration(2000)
      .attr("width", this.props.relationship.score * 10)
      .attr("height", this.props.relationship.score * 10)

    d3.select(`#score${this.props.relationship.id}-name`).transition()
      .delay(1000)
      .duration(500)
      .attr("x", this.props.relationship.score * 3)
      .attr("y", this.props.relationship.score * 5)
      .style("font-size", this.props.relationship.score * 2 + "px" )
  }

  componentDidUpdate() {

    d3.select(`#score${this.props.relationship.id}-container`).transition()
      .duration(1000)
      .attr("width", this.props.relationship.score * 10)
      .attr("height", this.props.relationship.score * 10)
    
    d3.select(`#score${this.props.relationship.id}`)
      .transition()
      .delay(1000)
      .duration(500)
      .attr("r", this.props.relationship.score * 4)
      .attr("cx", this.props.relationship.score * 5)
      .attr("cy", this.props.relationship.score * 5)

    d3.select(`#score${this.props.relationship.id}-name`).transition()
      .delay(1000)
      .duration(500)
      .attr("x", this.props.relationship.score * 3)
      .attr("y", this.props.relationship.score * 5)
      .style("font-size", this.props.relationship.score * 2 + "px" )

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

          {/*<text 
            x={relationship.score / 2} 
            y={relationship.score} 
            style={{"fill": "black", "fontSize": relationship.score}}
          >
            {relationship.score}
          </text>*/}
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
