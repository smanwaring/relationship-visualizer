import React from 'react';

export default ({ relationship, toggleMenu, showGraphic, loadRelationship }) => {

  return (
    <svg 
    className="circle-container" 
    id={`score${relationship.id}-container`}
    onClick={loadRelationship}>
      <circle 
        id={`score${relationship.id}`} 
        style={{"fill": "steelblue"}} 
        hidden={!showGraphic}>
      </circle>
      <text 
        id={`score${relationship.id}-name`} 
        style={{"fill": "black" }} 
        hidden={!showGraphic}>
        {relationship.name}
      </text>
    </svg>
  )
}