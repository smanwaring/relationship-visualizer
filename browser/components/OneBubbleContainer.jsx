import React, { Component } from 'react';
import { connect } from 'react-redux';
import Bubble from './Bubble';
import BubbleMenu from './BubbleMenu';
import { expandBubble } from '../d3/bubbleD3';
import { incrementScore } from './relationships/relationships.reducer';



class OneBubbleContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { selectedRelationship, loggedInUser, incrementScore } = this.props;
    return (
      <div>
        <Bubble relationship={this.props.selectedRelationship}/>
        <BubbleMenu 
          relationship={selectedRelationship}
          loggedInUser={loggedInUser}
          incrementScore={incrementScore}/>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  selectedRelationship: state.selectedRelationship,
  loggedInUser: state.loggedInUser
})

const mapDispatchToProps = dispatch => ({
  incrementScore: (relationship, loggedInUser) => dispatch(incrementScore(relationship, loggedInUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(OneBubbleContainer);