import React, { Component } from 'react';
import { connect } from 'react-redux';
import RelationshipReminder from './relationships-reminder.component';
import RelationshipsSingleBubble from './relationships-single-bubble.component';


/* -----------------    COMPONENT     ------------------ */
class Relationships extends Component {
  render() {
    const { relationships, loggedInUser } = this.props;
    const showAddReminder = relationships.length < 1;
    return (
      <div>
        {showAddReminder ?
          <RelationshipReminder />
          :
        <ul className="flex-container bubble-padding">
          {relationships && relationships.map( (relationship) => {
            const relationshipStyle = {
              background: relationship.color,
              width: relationship.score,
              height: relationship.score
            };
            return (
                <li key={relationship.id}>
                  <RelationshipsSingleBubble name={relationship.name} relationshipStyle={relationshipStyle} loggedInUser={loggedInUser} relationship={relationship} />
                </li>
            );
            })}
        </ul>
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
  };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Relationships);
