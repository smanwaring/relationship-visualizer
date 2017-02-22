import React from 'react';

export default ({ relationship }) => {
  return (
    <svg 
      height={relationship.score * 20}
      width={relationship.score * 20}
    >
      <circle 
        cx={relationship.score * 10}
        cy={relationship.score * 10}
        r={relationship.score * 8}
        style={{"fill": relationship.color}} >
      </circle>
      <text 
        className={`score${relationship.id}-name`} 
        style={
          {
            "fill": "black", 
            "fontSize": relationship.score * 4 
          }
        } 
        x={relationship.score * 6}
        y={relationship.score * 10}>
        {relationship.name}
      </text>
    </svg>
  )
}