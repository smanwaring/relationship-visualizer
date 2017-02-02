import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';

class AddActivityForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: ''
    }
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  handleTypeChange(event, index, value) {
    this.setState({type: value})
  }
  
  render() {
    return (
      <div>
        <form>
          <DropDownMenu value={this.state.type} onChange={this.handleTypeChange}>
            <MenuItem value={''} primaryText="Type of Contact" />
            <MenuItem value={'call'} primaryText="Call" />
            <MenuItem value={'text'} primaryText="Text" />
            <MenuItem value={'email'} primaryText="Email" />
            <MenuItem value={'inPerson'} primaryText="In Person" />
            <MenuItem value={'letter'} primaryText="Wrote Letter" />
          </DropDownMenu>
          <DatePicker hintText="Date" container="inline" />
        </form>
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
)(AddActivityForm);
