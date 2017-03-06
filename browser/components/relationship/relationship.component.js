import React, { Component } from 'react';
import { connect } from 'react-redux';
import Bubble from '../relationship-bubble/relationship-bubble.component';

/* -----------------    COMPONENT     ------------------ */
class Relationship extends Component {
  render() {
    const { selectedRelationship } = this.props;
    const relationshipStyle = {
      background: selectedRelationship.color,
      width: selectedRelationship.score,
      height: selectedRelationship.score
    };
    return (
      <div>
        <Bubble name={selectedRelationship.name} relationshipStyle={relationshipStyle} />
      </div>
    );
  }
}
/* -----------------    CONTAINER     ------------------ */
const mapStateToProps = ( { selectedRelationship } ) => {
	return {
    selectedRelationship
	};
};

const  mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Relationship);
