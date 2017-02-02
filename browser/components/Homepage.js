import React from 'react';
import { connect } from 'react-redux';
import Bubble from './Bubble';


class Homepage extends React.Component {

    render() {
        const { relationships } = this.props;
        return (
            <div className="container">
                <div className="row">
                    <h1> Hello World! </h1>
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

function mapStateToProps({ relationships }){
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
