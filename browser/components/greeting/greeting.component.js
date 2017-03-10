import React from 'react';

export default ({ loggedInUser }) => {

  return (
    <div style={style}>
      <h4>Hello, {loggedInUser.name}</h4>
      <h5>Here's how your relationships are doing today...</h5>
    </div>
  )
}

const style = {
  display: 'block',
  width: '100%',
  textAlign: 'center'
};

