import React from 'react';
import { connect } from 'react-redux';
import Bubble from './Bubble';
import AddRelationshipForm from './forms/AddRelationshipForm';
import RaisedButton from 'material-ui/RaisedButton';
import MainMenu from './MainMenu';


class Homepage extends React.Component {

  render() {
    const { relationships, selectedRelationship } = this.props;
    return (
      <div>
        <div className="slide-out-menu"><MainMenu auth={this.props.auth}/>
        </div>
          <div className="container">
            {
              this.props.children && React.cloneElement(this.props.children, {
                relationships,
                selectedRelationship
              })
            }
        </div>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

function mapStateToProps({ relationships, selectedRelationship, loggedInUser }){
	return {
    relationships,
    selectedRelationship,
    loggedInUser
	};
}

function mapDispatchToProps(dispatch){
	return {
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Homepage);
