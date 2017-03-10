import React, { Component } from 'react';
import { connect } from 'react-redux';

class Activities extends Component {
  constructor() {
    super();
  }

  render() {
    const { selectedRelationship, activities } = this.props;
    return (
      <div>
        <h1>Activities for {selectedRelationship.name}</h1>
        {
          activities.map((activity, i) => (
            <h2 key={i}>{activity.type}</h2>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = ({ selectedRelationship, activities }) => ({
  selectedRelationship,
  activities
})

export default connect(mapStateToProps)(Activities);