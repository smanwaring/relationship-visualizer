import React, { Component } from 'react';
import { Link } from 'react-router';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';


class Relationships extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
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

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

render(){
  const { loggedInUser, relationship, relationshipStyle, name} = this.props;
  return (
    <div className="bubble-container">
      <div className="bubble-container-center" onTouchTap={this.handleTouchTap}>
        <div>{name}</div>
        <div className="flex-bubble" onTouchTap={this.handleTouchTap} style={relationshipStyle} />
      </div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'middle', vertical: 'center'}}
          targetOrigin={{horizontal: 'middle', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
          animation={PopoverAnimationVertical}
        >
          <Menu>
            <MenuItem primaryText="Add Activity" />
            <Link to={`/relationship/user/${loggedInUser.id}/rel/${relationship.id}`}><MenuItem primaryText="View Activity History" /></Link>
            <Link to={`/relationship/user/${loggedInUser.id}/rel/${relationship.id}`}><MenuItem primaryText="Edit" /></Link>
          </Menu>
        </Popover>
    </div>
    );
  }
}

export default Relationships;


