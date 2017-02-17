import React, { Component } from 'react';
import { connect } from 'react-redux';
import Bubble from './Bubble';
import BubbleMenu from './BubbleMenu';
import { expandBubble } from '../d3/bubbleD3';


class OneBubbleContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    expandBubble(this.props.selectedRelationship)
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


export default connect()(OneBubbleContainer);