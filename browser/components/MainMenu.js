import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { clearLoggedInUser } from '../reducers/login';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';



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
							<IconMenu
								iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
								anchorOrigin={{horizontal: 'left', vertical: 'top'}}
								targetOrigin={{horizontal: 'left', vertical: 'top'}}
							>
								<MenuItem primaryText="Add a new contact" />
								<Divider />
								<MenuItem primaryText="Settings" />
								<Divider />
								<MenuItem onClick={this.logout} primaryText="Sign out" />
								
							</IconMenu>
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
