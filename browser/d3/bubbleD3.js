import * as d3 from "d3";

export const animateBubbles = (relationship) => {

    d3.select(`#score${relationship.id}`)
    .transition()
    .delay(1000)
    .duration(500)
    .attr("r", relationship.score * 4)
    .attr("cx", relationship.score * 5)
    .attr("cy", relationship.score * 5)


    d3.select(`#score${relationship.id}-container`).transition()
      .duration(1000)
      .attr("width", relationship.score * 10)
      .attr("height", relationship.score * 10)

    d3.select(`#score${relationship.id}-name`).transition()
      .delay(1000)
      .duration(500)
      .attr("x", relationship.score * 3)
      .attr("y", relationship.score * 5)
      .style("font-size", relationship.score * 2 + "px" )
}

export const expandBubble = (relationship) => {
  d3.select(`#score${relationship.id}`)
    .transition()
    .delay(1000)
    .duration(500)
    .attr("r", relationship.score * 8)
    .attr("cx", relationship.score * 10)
    .attr("cy", relationship.score * 10)

  d3.select(`#score${relationship.id}-container`).transition()
    .duration(1000)
    .attr("width", relationship.score * 20)
    .attr("height", relationship.score * 20)

  d3.select(`#score${relationship.id}-name`).transition()
    .delay(1000)
    .duration(500)
    .attr("x", relationship.score * 6)
    .attr("y", relationship.score * 10)
    .style("font-size", relationship.score * 4 + "px" )

}