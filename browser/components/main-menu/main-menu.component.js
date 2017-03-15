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
import AddRelationshipForm from '../forms/add-relationship/add-relationship.component';
import { toggleStateModal } from './main-menu.reducer';

/* -----------------    COMPONENT     ------------------ */
class MainMenu extends React.Component {
	constructor(props){
		super(props);
		this.logout = this.logout.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
	}

	handleOpen(str) {
		this.props.toggleModal(str, true);
  }

	handleClose(str) {
		this.props.toggleModal(str, false);
	}

  // log a user out of auth0 and clear loggedInUserState
	logout() {
		this.props.auth.logout();
		this.props.clearUserState();
		$('.button-collapse').sideNav('destroy');
		browserHistory.replace('/login');
	}


    render() {
			const { showAddRelationshipModal } = this.props.mainMenu;
			const addRelationshipActions = [];
        return (
            <div>
							<IconMenu
									iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
									anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
									targetOrigin={{ horizontal: 'left', vertical: 'top' }}
									iconStyle={{ color: 'white' }}
							>
									<MenuItem onClick={ () => this.handleOpen('showAddRelationshipModal') } primaryText="Add a new Relationship" />
									<Divider />
									<MenuItem onClick={ () => browserHistory.push('/relationships')} primaryText="View All Relationships" />
									<Divider />
									<MenuItem onClick={ this.logout } primaryText="Sign out" />
							</IconMenu>

							{/* add new relationship modal */}
							<Dialog
								title="Add a new relationship"
								actions={ addRelationshipActions }
								modal={ false }
								open={ showAddRelationshipModal }
								onRequestClose={ () => this.handleClose('showAddRelationshipModal') }
							>
								<AddRelationshipForm />
							</Dialog>
            </div>
        );
    }
}

/* -----------------    CONTAINER     ------------------ */

function mapStateToProps( { mainMenu  } ){
	return {
		mainMenu
	};
}

function mapDispatchToProps(dispatch){
	return {
        clearUserState: () => {
					dispatch( clearLoggedInUser() );
        },
				toggleModal: (str, bool) => {
					dispatch( toggleStateModal(str, bool) );
				}
    };
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainMenu);
