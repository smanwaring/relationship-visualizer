import React, { Component } from 'react';
import { connect } from 'react-redux';
import RelationshipReminder from './relationships-reminder.component';
import RelationshipBubble from '../relationship-bubble/relationship-bubble.component';

/* -----------------    COMPONENT     ------------------ */
class Relationships extends Component {
  render() {
    const { relationships } = this.props;
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
                <RelationshipBubble name={relationship.name} relationshipStyle={relationshipStyle}/>
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
const mapStateToProps = ( { relationships } ) => {
	return {
    relationships
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
