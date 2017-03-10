import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';


/* -----------------    COMPONENT     ------------------ */
class SortBy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleTouchTap(event){
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose(){
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <div>
        <FlatButton
          onTouchTap={this.handleTouchTap}
          label="Sort by"
          labelStyle={{ color: 'white' }}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText="Smallest-Largest" onClick={() => {this.props.sortSmallToLarge(); this.handleRequestClose()}} />
            <MenuItem primaryText="Largest-Smallest" onClick={() => {this.props.sortLargeToSmall(); this.handleRequestClose()}} />
            <MenuItem primaryText="Name A-Z" onClick={() => {this.props.sortAsc(); this.handleRequestClose()}} />
            <MenuItem primaryText="Name Z-A" onClick={() => {this.props.sortDesc(); this.handleRequestClose()}} />
          </Menu>
        </Popover>
      </div>
    );
  }
}
/* -----------------    CONTAINER     ------------------ */
const mapStateToProps = ( { relationships, loggedInUser } ) => {
	return {
    relationships,
    loggedInUser
	};
};

const  mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SortBy);
