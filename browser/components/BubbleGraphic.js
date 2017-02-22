import React from 'react';

export default ({ relationship, toggleMenu, showGraphic, loadRelationship }) => {
  return (
    <svg 
    className={`score${relationship.id}-container`}
    onClick={loadRelationship}>
      <circle 
        className={`score${relationship.id}`} 
        style={{"fill": relationship.color}} 
        hidden={!showGraphic}>
      </circle>
      <text 
        className={`score${relationship.id}-name`} 
        style={{"fill": "black" }} 
        hidden={!showGraphic}>
        {relationship.name}
      </text>
    </svg>
  )
}