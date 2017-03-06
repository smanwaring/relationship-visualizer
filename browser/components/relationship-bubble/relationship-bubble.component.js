import React from 'react';

export default ({ relationshipStyle, name }) => {
  return (
    <div className="bubble-container">
      <div className="bubble-container-center">
        <div>{name}</div>
        <div className="flex-bubble" style={relationshipStyle}/>
      </div>
    </div>
  );
};
