import React from 'react';
import { connect } from 'react-redux';
import Bubble from './Bubble';
import { hashHistory } from 'react-router';
import { setLoggedInUser, clearLoggedInUser } from '../reducers/login';


class Logout extends React.Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }
    // log a user out of auth0 
    logout() {
    this.props.auth.logout();
    hashHistory.push('/login');
  }

    render() {
        return (
            <div>
                <button onClick={this.logout}>LOGOUT</button>
            </div>
        );
    }
}


export default Logout;
