import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { clearLoggedInUser } from '../login/login.reducer';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AddRelationshipForm from '../forms/add-relationship/add-relationship.component';
import SettingsForm from '../forms/SettingsForm';

class MainMenu extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			showAddRelationship: false,
			showSettings: false
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
			const addRelationshipActions = [
				/*<FlatButton
					label="Cancel"
					primary={true}
					keyboardFocused={true}
					onTouchTap={ () => this.handleClose('showAddRelationship') }
				/>*/
			]
			const settingsActions = [
				<FlatButton
					label="Cancel"
					primary={true}
					keyboardFocused={true}
					onTouchTap={ () => this.handleClose('showSettings') }
				/>
			]
        return (
            <div>
							<IconMenu
									iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
									anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
									targetOrigin={{ horizontal: 'left', vertical: 'top' }}
							>
									<MenuItem onClick={ () => this.handleOpen('showAddRelationship') } primaryText="Add a new Relationship" />
									<Divider />
									<MenuItem onClick={ () => this.handleOpen('showSettings') } primaryText="Settings" />
									<Divider />
									<MenuItem onClick={ this.logout } primaryText="Sign out" />
							</IconMenu>

							{/* add new relationship modal */}
							<Dialog
								title="Add a new relationship"
								actions={ addRelationshipActions }
								modal={ false }
								open={ this.state.showAddRelationship }
								onRequestClose={ () => this.handleClose('showAddRelationship') }
							>
								<AddRelationshipForm />
							</Dialog>

							{/* settings dialog modal */}
							<Dialog
								title="Settings"
								actions={ settingsActions }
								modal={ false }
								open={ this.state.showSettings }
								onRequestClose={ () => this.handleClose('showSettings') }
							>
								<SettingsForm />
							</Dialog>
            </div>
        );
    }
}

/* -----------------    CONTAINER     ------------------ */

function mapStateToProps(state){
	return {
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
