import React from 'react';
import { connect } from 'react-redux';
import Bubble from './Bubble';


class Homepage extends React.Component {

    render() {
        const { relationships } = this.props;
        return (
            <div>
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
