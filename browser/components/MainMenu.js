import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { clearLoggedInUser } from '../reducers/login';


class MainMenu extends React.Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    // log a user out of auth0 and clear loggedInUserState
    logout() {
        this.props.auth.logout();
        this.props.clearUserState();
         $('.button-collapse').sideNav('destroy');
        browserHistory.replace('/login');
    }

    componentDidMount(){
        // Initialize collapse button
        $(".button-collapse").sideNav();
        // Initialize collapsible (uncomment the line below if you use the dropdown variation)
        //$('.collapsible').collapsible();
    }

    render() {
        return (
            <div>
                <ul id="slide-out" className="side-nav">
                    <li><div className="userView">
                    <div className="background">
                        <img src="images/office.jpg" />
                    </div>
                    <a href="#!user"><img className="circle" src="images/yuna.jpg" /></a>
                    <a href="#!name"><span className="white-text name">John Doe</span></a>
                    <a href="#!email"><span className="white-text email">jdandturk@gmail.com</span></a>
                    </div></li>
                    <li><div className="divider" /></li>
                    <li><a className="waves-effect">Add a new contact</a></li>
                    <li><a className="waves-effect">Settings</a></li>
                    <li><a className="waves-effect" onClick={this.logout}>Logout</a></li>
                </ul>
                <button data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></button>
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
)(MainMenu);
