import React from 'react';
import { connect } from 'react-redux';
import Bubble from './Bubble';
import { hashHistory } from 'react-router';
import { setLoggedInUser, clearLoggedInUser } from '../reducers/login';
import Logout from './Logout';


class Homepage extends React.Component {

    render() {
        // const { user_id } = this.props.auth.getProfile();
        const { relationships } = this.props;
        return (
            <div>
                <Logout auth={this.props.auth}/>
                <h1> Hello World! </h1>
                {
                    relationships.map((relationship, i) => (
                        <Bubble 
                        key={i}
                        relationship={relationship}
                        />
                    ))
                }
            </div>
        );
    }
}

/* -----------------    CONTAINER     ------------------ */

function mapStateToProps({ relationships, loggedInUser }){
	return {
        relationships,
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
