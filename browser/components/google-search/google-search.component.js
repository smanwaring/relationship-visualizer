import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default () => {

  return (
    <div style={style}>
      <form method="get" action="http://www.google.com/search">
        <TextField 
          type="text"
          hintStyle={{ color: 'white' }} 
          underlineFocusStyle={{ backgroundColor: 'white' }} 
          inputStyle={{ color: 'white' }}
          underlineShow={false} 
          hintText="Search Google"
          name="q"
        />
      </form>
    </div>
  )
}

const style = {
  marginLeft: "3em",
  marginTop: "1em",
  display: 'block',
  width: '100%',
};
