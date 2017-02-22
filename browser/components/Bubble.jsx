import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as d3 from "d3";
import BubbleGraphic from './BubbleGraphic';
import BubbleMenu from './BubbleMenu';
import { expandBubble } from '../d3/bubbleD3';
import { fetchSelectedRelationship } from '../reducers/selectedRelationship';


class Bubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGraphic: true
    }
    this.addToScore = this.addToScore.bind(this);
    this.loadRelationship = this.loadRelationship.bind(this);
  }

  addToScore(relationship, user) {
    this.props.incrementScore(relationship, user)
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
        <BubbleGraphic
          relationship={ relationship } 
          loadRelationship={this.loadRelationship}
          showGraphic={this.state.showGraphic}
        />
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
    fetchSelectedRelationship
	};


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Bubble);
