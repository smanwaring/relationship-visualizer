import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CirclePicker } from 'react-color';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { changeColor, editRelationship } from '../../relationships/relationships.reducer';

class EditRelationship extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: props.relationship.color,
      name: props.relationship.name
    }
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleColorChange(color, event) {
    event.preventDefault();
    this.setState({ color: color.hex });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit(color, event) {
    const { editRelationship, relationship, handleClose } = this.props;
    console.log(this.state.name);
    editRelationship(relationship.id, this.state.color, this.state.name);
    handleClose();
  }

  render() {
    const { colorPickerStyle, buttonStyle } = style;
    return (
      <div style={colorPickerStyle}>
        <TextField 
          onChange={this.handleNameChange}
          floatingLabelText="Edit Name" 
          defaultValue={this.state.name}  
        />
        <CirclePicker 
          onChange={ this.handleColorChange }
          color={this.state.color}
        />
        <RaisedButton label="Save" onTouchTap={this.handleSubmit} style={buttonStyle}/>
      </div>
    )
  }

}


const mapStateToProps = state => ({
  selectedRelationship: state.selectedRelationship
})

const mapDispatchToProps = dispatch => ({
  changeColor: (colorHex) => dispatch(changeColor(colorHex)),
  editRelationship: (relationshipId, color, name) => dispatch(editRelationship(relationshipId, color, name))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditRelationship);

const style = {
  colorPickerStyle: {
    "paddingTop": "1em",
  },
  buttonStyle: {
    "marginTop": "1em"
  }
}