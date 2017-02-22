import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { clearLoggedInUser } from '../reducers/login';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AddRelationshipForm from './forms/AddRelationshipForm';

class MainMenu extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			addContact: false,
			settings: false
		};
		this.logout = this.logout.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
	}

	handleOpen(str) {
    this.setState({ [str]: true });
  }

	handleClose(str) {
    this.setState({ [str]: false });
	}

  // log a user out of auth0 and clear loggedInUserState
	logout() {
		this.props.auth.logout();
		this.props.clearUserState();
		$('.button-collapse').sideNav('destroy');
		browserHistory.replace('/login');
	}

    render() {
			const addContactActions = [
				<FlatButton
					label="Cancel"
					primary={true}
					keyboardFocused={true}
					onTouchTap={ () => this.handleClose("addContact") }
				/>
			]
			const settingsActions = [
				<FlatButton
					label="Cancel"
					primary={true}
					keyboardFocused={true}
					onTouchTap={ () => this.handleClose("settings") }
				/>
			]
        return (
            <div>
							<IconMenu
									iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
									anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
									targetOrigin={{ horizontal: 'left', vertical: 'top' }}
							>
									<MenuItem onClick={ () => this.handleOpen('addContact') } primaryText="Add a new contact" />
									<Divider />
									<MenuItem onClick={ () => this.handleOpen('settings') } primaryText="Settings" />
									<Divider />
									<MenuItem onClick={ this.logout } primaryText="Sign out" />
							</IconMenu>

							{/* add new contact modal */}
							<Dialog
								title="Add a new contact"
								actions={ addContactActions }
								modal={ false }
								open={ this.state.addContact }
								onRequestClose={ () => this.handleClose('addContact') }
							>
								<AddRelationshipForm />
							</Dialog>

							{/* settings dialog modal */}
							<Dialog
								title="Settings"
								actions={ settingsActions }
								modal={ false }
								open={ this.state.settings }
								onRequestClose={ () => this.handleClose('settings') }
							>
							</Dialog>
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
