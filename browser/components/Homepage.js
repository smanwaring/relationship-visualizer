import React from 'react';
import { connect } from 'react-redux';
import Bubble from './Bubble';
import AddRelationshipForm from './forms/AddRelationshipForm';
import RaisedButton from 'material-ui/RaisedButton';
import { hashHistory } from 'react-router';
import { setLoggedInUser, clearLoggedInUser } from '../reducers/login';
import Logout from './Logout';


class Homepage extends React.Component {

    render() {
        // const { user_id } = this.props.auth.getProfile();
        const { relationships } = this.props;
        return (

            <div className="container">
              <Logout auth={this.props.auth}/>
                <div className="row">
                    {
                        relationships.map((relationship, i) => (
                            <div className="col l4 m6 s12" key={i}>
                                <Bubble relationship={relationship} />
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

/* -----------------    CONTAINER     ------------------ */

function mapStateToProps({ relationships, loggedInUser }){
	return {
    relationships
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
