import React, { Component } from 'react';
import { connect } from 'react-redux';
import RelationshipReminder from './relationships-reminder.component';
import RelationshipsSingleBubble from './relationships-single-bubble.component';
import SortBy from '../sort-by/sort-by.component';
import FlipMove from 'react-flip-move';
import { sortRelationshipState } from './relationships.reducer';
import FilterSearch from '../filter-search/filter-search.component';
import TextField from 'material-ui/TextField';
import Greeting from '../greeting/greeting.component.js';

/* -----------------    COMPONENT     ------------------ */
class Relationships extends Component {
    constructor(props) {
    super(props);
    this.state = {
      enterLeaveAnimation: 'accordionHorizontal',
      order: 'asc',
      sortingMethod: 'chronological',
      filterStr: '',
      filteredRelationships: []
    };
    this.renderRelationships = this.renderRelationships.bind(this);
    this.sortAsc = this.sortAsc.bind(this);
    this.sortDesc = this.sortDesc.bind(this);
    this.sortSmallToLarge = this.sortSmallToLarge.bind(this);
    this.sortLargeToSmall = this.sortLargeToSmall.bind(this);
    this.filterSearch = this.filterSearch.bind(this);
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

  filterSearch(evt){
    evt.preventDefault();
    this.setState({filterStr: evt.target.value});
    const relationshipsCopy = this.props.relationships.filter(relationship => {
      if (relationship.name.toLowerCase().includes(evt.target.value.toLowerCase())){
        return true;
      }
    });
    this.setState({filteredRelationships: relationshipsCopy});
  }

  renderRelationships() {
    console.log(this.state.filteredRelationships);
    const relationshipsToUse = this.state.filterStr !== '' ? this.state.filteredRelationships : this.props.relationships;
    return relationshipsToUse.map( (relationship) => {
      const relationshipStyle = {
        background: relationship.color,
        width: relationship.score,
        height: relationship.score
      };
      return (
        <li key={relationship.id}>
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
              <div className="in-line"><FilterSearch filterSearch={this.filterSearch} /></div>
              <div className="in-line"><SortBy  sortAsc={this.sortAsc} sortDesc={this.sortDesc} sortSmallToLarge={this.sortSmallToLarge} sortLargeToSmall={this.sortLargeToSmall} /></div>
            </div>
            <div> <Greeting loggedInUser={loggedInUser} /></div>
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
