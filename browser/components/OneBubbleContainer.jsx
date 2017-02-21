import React, { Component } from 'react';
import { connect } from 'react-redux';
import Bubble from './Bubble';
import BubbleMenu from './BubbleMenu';
import { expandBubble } from '../d3/bubbleD3';


class OneBubbleContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Bubble relationship={this.props.selectedRelationship}/>
        <BubbleMenu relationship={this.props.selectedRelationship}/>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  selectedRelationship: state.selectedRelationship
})

export default connect(mapStateToProps)(OneBubbleContainer);