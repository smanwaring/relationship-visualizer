import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import AddActivityForm from './forms/AddActivityForm';


class Bubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addForm: false
    }
  }
  
  render() {
    const { relationship } = this.props;
    return (
      <div>
        <h4>BUBBLE!</h4>
        <p>Name: {relationship.name}</p>
        <p>Type: {relationship.type}</p>
        <p>Score: {relationship.score}</p>
        <Link to={`/relationship/${relationship.id}/activities`}><RaisedButton label="View Activities" primary={true} /></Link>
        <RaisedButton label="Add Activity" secondary={true} onTouchTap={() => this.setState({addForm: !this.state.addForm})}/>
        {
          this.state.addForm ? <AddActivityForm /> : null
          }
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

function mapStateToProps(state){
	return {
	};
}

function mapDispatchToProps(dispatch){
	return {
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Bubble);
