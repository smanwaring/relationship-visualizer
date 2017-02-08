import React from 'react';
import { connect } from 'react-redux';
import Bubble from './Bubble';
import AddRelationshipForm from './forms/AddRelationshipForm';
import RaisedButton from 'material-ui/RaisedButton';
import MainMenu from './MainMenu';


class Homepage extends React.Component {

    render() {
        const { relationships } = this.props;
        return (
        <div>
        <div className="slide-out-menu"><MainMenu auth={this.props.auth}/>
        </div>
            <div className="container">
                <div className="row">
                    {
                        relationships.map((relationship, i) => (
                            <div className="col s6 m6 s12" key={i}>
                                <Bubble relationship={relationship} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        );
    }
}

/* -----------------    CONTAINER     ------------------ */

function mapStateToProps({ relationships, loggedInUser }){
	return {
        relationships,
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
