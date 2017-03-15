import React from 'react';
import Clock from '../clock/clock.component';

export default ({ loggedInUser }) => {

  return (
    <div style={style}>
      <Clock />
      <h4>Hello, {loggedInUser.firstName}</h4>
      <h5>Here's how your relationships are doing today...</h5>
    </div>
  )
}

const style = {
  display: 'block',
  width: '100%',
  textAlign: 'center'
};

