import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton'; 
import { CirclePicker } from 'react-color';
import { browserHistory } from 'react-router';
import RelationshipReminder from './relationships-reminder.component';

class Test extends Component {

  render() {
    const { relationships } = this.props;
    const showAddReminder = relationships.length < 1;
    return (
      <div>
        {showAddReminder ?
          <RelationshipReminder />
          :
        <ul className="flex-container">
          {relationships && relationships.map( (relationship,i) => {
            const relationShipStyle = {
              background: relationship.color,
              width: 220,
              height: 220
            };
            return (
              <li key={relationship.id}>
                <div className="bubble-container">
                  <div className="bubble-container-center">
                    <div>{relationship.name}</div>
                    <div className="flex-bubble" style={relationShipStyle}></div>
                  </div>
                </div>
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
)(Test);