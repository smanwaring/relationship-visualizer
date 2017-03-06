import React from 'react';
import { Link } from 'react-router';

export default ({ relationshipStyle, name, loggedInUser, relationship }) => {
  return (
    <div className="bubble-container">
      <div className="bubble-container-center">
        <Link to={`/relationship/user/${loggedInUser.id}/rel/${relationship.id}`}><div>{name}</div></Link>
        <Link to={`/relationship/user/${loggedInUser.id}/rel/${relationship.id}`}><div className="flex-bubble" style={relationshipStyle} /></Link>
      </div>
    </div>
  );
};
