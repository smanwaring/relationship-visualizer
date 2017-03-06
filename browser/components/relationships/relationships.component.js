import React, { Component } from 'react';
import { connect } from 'react-redux';
import RelationshipReminder from './relationships-reminder.component';
import RelationshipBubble from '../relationship-bubble/relationship-bubble.component';
import { Link } from 'react-router';

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
                <Link to={`/relationship/user/${loggedInUser.id}/rel/${relationship.id}`}><RelationshipBubble name={relationship.name} relationshipStyle={relationshipStyle}/>
              </Link></li>
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
