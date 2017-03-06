import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import { postNewActivity } from './add-activity.reducer';

class AddActivityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      date: null,
      relationshipId: this.props.relationshipId
    };
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleTypeChange(event, index, value) {
    this.setState({type: value});
  }

  handleDateChange(event, date) {
    this.setState({ date });
  }

  submitForm() {
    this.props.postNewActivity(this.state);
  }

  render() {
    let { type, date, time } = this.state;
    return (
      <div autoFocus="false">
          <SelectField 
            value={this.state.type} 
            onChange={this.handleTypeChange}
            floatingLabelText="Type"
          >
            <MenuItem value={null} primaryText="" />
            <MenuItem value={'call'} primaryText="Call" />
            <MenuItem value={'text'} primaryText="Text" />
            <MenuItem value={'email'} primaryText="Email" />
            <MenuItem value={'inPerson'} primaryText="In Person" />
            <MenuItem value={'letter'} primaryText="Wrote Letter" />
          </SelectField>
          <DatePicker hintText="Date" autoOk={true} onChange={this.handleDateChange} />
          <RaisedButton label="Submit" onClick={this.submitForm} disabled={ !date || !type } />
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

function mapStateToProps(state){
	return {
	};
}

const  mapDispatchToProps = { postNewActivity };


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddActivityForm);
