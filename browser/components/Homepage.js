import React from 'react';
import { connect } from 'react-redux';
import Bubble from './Bubble';
import AddRelationshipForm from './forms/AddRelationshipForm';
import RaisedButton from 'material-ui/RaisedButton';


class Homepage extends React.Component {

  render() {
  console.log(this)
    const { relationships } = this.props;
    return (
      <div className="container">
        <div>
          <AddRelationshipForm />
        </div>
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
