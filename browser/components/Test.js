import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton'; 
import { CirclePicker } from 'react-color';
import { browserHistory } from 'react-router';

class Test extends Component {

  render() {
    const { relationships } = this.props;
    console.log(relationships)
    return (
      <div>
        <ul className="flex-container">
          {relationships && relationships.map( (relationship,i) => {
            const relationShipStyle = {
              background: relationship.color,
              width: relationship.score*10,
              height: relationship.score*10
            }
            return (
              <li key={relationship.id}>
                <div className="bubble-container">
                  <div className="bubble-container-center">
                    <div>{relationship.name}</div>
                    <div className="flex-bubble" style={relationShipStyle}></div>
                  </div>
                </div>
              </li>
            )
            })}
        </ul>
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