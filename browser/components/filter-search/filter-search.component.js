import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';


/* -----------------    COMPONENT     ------------------ */
class FilterSearch extends Component {
  render() {
    return (
      <div>
        <TextField underlineShow={false} hintText="Search Relationships" onChange={(evt) => this.props.filterSearch(evt)} />
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
)(FilterSearch);
