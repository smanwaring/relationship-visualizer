import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as d3 from "d3";
import BubbleGraphic from './BubbleGraphic';
import BubbleMenu from './BubbleMenu';
import { animateBubbles } from '../d3/bubbleD3';
import { incrementScore } from '../reducers/relationships';
import { fetchSelectedRelationship } from '../reducers/selectedRelationship';


class Bubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      showGraphic: true
    }
    this.addToScore = this.addToScore.bind(this);
    this.loadRelationship = this.loadRelationship.bind(this);
  }

  componentDidMount() {
    console.log(this.props.relationship);
    animateBubbles(this.props.relationship);
  }

  componentDidUpdate() {
    animateBubbles(this.props.relationship);
  }

  addToScore(relationship, user) {
    this.props.incrementScore(relationship, user)
  }

  showMenu() {
    const { relationship, loggedInUser } = this.props;
    if(this.state.showMenu) {
      return <BubbleMenu
        addToScore={this.addToScore}
        loggedInUser={loggedInUser}
        relationship={relationship}
      />  
    }
  }

  loadRelationship() {
    const { relationship } = this.props;
    this.props.fetchSelectedRelationship({ relationshipId: relationship.id })
    .then(() => {
      browserHistory.push(`/relationship/${relationship.id}`)
    })
  }

  render() {
    const { relationship, loggedInUser } = this.props;

    return (
      <div>
        <div>
          {this.showMenu()}
        <BubbleGraphic
          relationship={ relationship } 
          loadRelationship={this.loadRelationship}
          showGraphic={this.state.showGraphic}
        />
        </div>
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
    incrementScore,
    fetchSelectedRelationship
	};


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Bubble);
