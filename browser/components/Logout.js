import React from 'react';
import { connect } from 'react-redux';
import Bubble from './Bubble';
import { browserHistory } from 'react-router';
import { clearLoggedInUser } from '../reducers/login';


class Logout extends React.Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }
    // log a user out of auth0 and clear loggedInUserState
    logout() {
    this.props.auth.logout();
    this.props.clearUserState();
    browserHistory.replace('/login');
  }

    render() {
        return (
            <div>
                <button onClick={this.logout}>LOGOUT</button>
            </div>
        );
    }
}


/* -----------------    CONTAINER     ------------------ */

function mapStateToProps({ loggedInUser }){
	return {
        loggedInUser
	};
}

function mapDispatchToProps(dispatch){
	return {
        clearUserState: function(){
            dispatch(clearLoggedInUser());
        }
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Logout);

