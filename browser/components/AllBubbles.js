import React from 'react';
import Bubble from './Bubble';

export default ({ relationships }) => {
  return (
    <div className="row">
      {
        relationships.map((relationship, i) => (
          <div className="col s6 m6 s12" key={i}>
            <Bubble relationship={relationship} />
          </div>
        ))
      }
  </div>
  )
}