import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Modal from 'react-modal';
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
    console.log(this.state.addForm);
    return (
      <div>
        <h4>BUBBLE!</h4>
        <p>Name: {relationship.name}</p>
        <p>Type: {relationship.type}</p>
        <p>Score: {relationship.score}</p>
        <Link to={`/relationship/${relationship.id}/activities`}><RaisedButton label="View Activities" primary={true} /></Link>
        <RaisedButton label="Add Activity" secondary={true} onTouchTap={() => this.setState({addForm: !this.state.addForm})}/>

            <Modal
              isOpen={this.state.addForm}
              onRequestClose={() => this.setState({ addForm: false })}
              closeTimeoutMS={0}
              style={customStyles}
              contentLabel="Modal"
              className="activity-form"
              
            >
            <div>
              <AddActivityForm relationshipId={relationship.id} autoFocus="true"/>
            </div>
          </Modal> 
        </div>
    )
  }
}

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    opacity: '1'
  },
  overlay: {
    backgroundColor: 'black',
    opacity: '.8'
  }
};


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
