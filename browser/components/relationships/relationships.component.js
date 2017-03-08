import React, { Component } from 'react';
import { connect } from 'react-redux';
import RelationshipReminder from './relationships-reminder.component';
import RelationshipsSingleBubble from './relationships-single-bubble.component';
import SortBy from '../sort-by/sort-by.component';
import FlipMove from 'react-flip-move';
import { sortRelationshipState } from './relationships.reducer';

/* -----------------    COMPONENT     ------------------ */
class Relationships extends Component {
    constructor(props) {
    super(props);
    this.state = {
      enterLeaveAnimation: 'accordionHorizontal',
      order: 'asc',
      sortingMethod: 'chronological',
    };
    this.renderRelationships = this.renderRelationships.bind(this);
    this.sortAsc = this.sortAsc.bind(this);
    this.sortDesc = this.sortDesc.bind(this);
    this.sortSmallToLarge = this.sortSmallToLarge.bind(this);
    this.sortLargeToSmall = this.sortLargeToSmall.bind(this);
  }

  sortAsc(){
    const sortAsc = (a, b) => a.name.localeCompare(b.name);
    const relationshipsCopy = this.props.relationships.slice(0);
    relationshipsCopy.sort(sortAsc);
    this.props.sortRelationships(relationshipsCopy);
  }

  sortDesc(){
    const sortDesc = (a, b) => b.name.localeCompare(a.name);
    const relationshipsCopy = this.props.relationships.slice(0);
    relationshipsCopy.sort(sortDesc);
    this.props.sortRelationships(relationshipsCopy);
  }

  sortSmallToLarge(){
    const sortAsc = (a, b) => a.score - b.score;
    const relationshipsCopy = this.props.relationships.slice(0);
    relationshipsCopy.sort(sortAsc);
    this.props.sortRelationships(relationshipsCopy);
  }

  sortLargeToSmall(){
    const sortDesc = (a, b) => b.score - a.score;
    const relationshipsCopy = this.props.relationships.slice(0);
    relationshipsCopy.sort(sortDesc);
    this.props.sortRelationships(relationshipsCopy);
  }

  renderRelationships() {
    return this.props.relationships.map( (relationship) => {
      const relationshipStyle = {
        background: relationship.color,
        width: relationship.score,
        height: relationship.score
      };
      const classes = 'grid';
      return (
        <li key={relationship.id} className={classes}>
          <RelationshipsSingleBubble name={relationship.name} relationshipStyle={relationshipStyle} loggedInUser={this.props.loggedInUser} relationship={relationship} />
        </li>
      );
    });
  }

  render() {
    const { relationships, loggedInUser } = this.props;
    const showAddReminder = relationships.length < 1;
    return (
      <div>
        {showAddReminder ?
          <RelationshipReminder />
          :
          <div>
            <div className="position-right">
              <SortBy sortAsc={this.sortAsc} sortDesc={this.sortDesc} sortSmallToLarge={this.sortSmallToLarge} sortLargeToSmall={this.sortLargeToSmall} />
            </div>
              <FlipMove
                staggerDurationBy="30"
                duration={500}
                enterAnimation={this.state.enterLeaveAnimation}
                leaveAnimation={this.state.enterLeaveAnimation}
                typeName="ul"
                className="flex-container bubble-padding"
              >
                { this.renderRelationships() }
              </FlipMove>
        </div>
        }
      </div>
    );
  }
}
/* -----------------    CONTAINER     ------------------ */
const mapStateToProps = ( { relationships, loggedInUser } ) => {
	return {
    relationships,
    loggedInUser
	};
};

const  mapDispatchToProps = (dispatch) => {
  return {
    sortRelationships: (newRelationshipArr) => {
      dispatch( sortRelationshipState(newRelationshipArr));
    }
  };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Relationships);
