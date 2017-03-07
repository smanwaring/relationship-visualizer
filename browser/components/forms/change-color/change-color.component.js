import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CirclePicker } from 'react-color';
import RaisedButton from 'material-ui/RaisedButton';
import { changeColor, saveColor } from '../../relationship/relationship.reducer';

class ColorPicker extends Component {
  constructor() {
    super();
    this.state = {
      color: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(color, event) {
    event.preventDefault();
    this.props.changeColor(color.hex);
    this.setState({ color: color.hex })
  }

  handleSubmit(color, event) {
    const { saveColor, selectedRelationship, handleClose } = this.props;
    saveColor(selectedRelationship.id, this.state.color);
    handleClose();
  }

  render() {
    const { colorPickerStyle, buttonStyle } = style;
    return (
      <div style={colorPickerStyle}>
        <CirclePicker 
          onChange={ this.handleChange }
          color={this.props.selectedRelationship.color}
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
  saveColor: (relationshipId, color) => dispatch(saveColor(relationshipId, color))
})

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker);

const style = {
  colorPickerStyle: {
    "paddingTop": "1em",
  },
  buttonStyle: {
    "marginTop": "1em"
  }
}