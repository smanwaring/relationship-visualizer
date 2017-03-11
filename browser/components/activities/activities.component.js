import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import RelationshipBubble from '../relationship-bubble/relationship-bubble.component';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';


class Activities extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { selectedRelationship, activities } = this.props;
    const { color, score } = this.props.selectedRelationship;
    const { infoStyle, chartStyle } = style;
    const bubbleStyle = {
      background: color,
      width: score,
      height: score
    }
    const date = new Date(selectedRelationship.createdAt).toDateString();

    const lineData = [];
    const pieData = [
      { name: 'In Person', value: 0 },
      { name: 'Call', value: 0 },
      { name: 'Email', value: 0 },
      { name: 'Text', value: 0 },
      { name: 'Wrote Letter', value: 0 },
    ];

    for(let i = 0; i < 28; i++) {
      lineData[i] = { days: i, timesContacted: 0 };
    }
    
    activities.forEach((activity, i) => {
      const oneDay = 1000 * 60 * 60 * 24;
      const diff = Math.floor(((new Date()).getTime() - (new Date(activity.date)).getTime()) / oneDay);
      lineData[diff].timesContacted++;
      pieData.forEach(data => {
        if(data.name === activity.type) data.value++;
      })
    })

    const sortedLineData = lineData.sort((a, b) => {
      return b.days - a.days;
    })

    const pieColors = ['#fff', '#404040', '#808080', '#bfbfbf', ' #000' ];

    return (
      <div>
        <div>
          <IconButton tooltip="Go Back" iconStyle={{ color: 'white' }} onClick={() => browserHistory.push('/relationships')} >
            <ArrowBack />
          </IconButton>
        </div>
        <div style={infoStyle}>
          <div className="bubble-container-center vam">
            <div className="flex-bubble" style={bubbleStyle}/>
          </div>
        </div>
        <div style={infoStyle}>
          <h3>{selectedRelationship.name}</h3>
          <h5>Type: {selectedRelationship.type}</h5>
          <h5>Created on: {date}</h5>
          <h5>Score: {Math.floor(selectedRelationship.score)}</h5>
        </div>
        <div style={chartStyle}>
          <LineChart width={600} height={300} data={sortedLineData}
            margin={{ top: 50, right: 100, left: 50, bottom: 50 }}>
            <XAxis dataKey="days" label="Days ago" interval={2} />
            <YAxis dataKey="timesContacted" label="Times Contacted" interval={1} />
            <Tooltip  itemStyle={{ color: 'black' }}/>
            <Line type="monotone" dataKey="timesContacted" stroke="white" dot={false} strokeWidth={2} />
          </LineChart>
        </div>
        <div style={chartStyle}>
          <PieChart width={700} height={400} >
            <Pie isAnimationActive={true} data={pieData} cx={350} cy={200} outerRadius={140} innerRadius={120} fill="white" paddingAngle={5} label>
              {              
                pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index]} />
                ))
              }
            </Pie>
            <Tooltip itemStyle={{ color: 'black' }} />
            <Legend />
          </PieChart>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ selectedRelationship, activities, loggedInUser }) => ({
  selectedRelationship,
  activities,
  loggedInUser
})

export default connect(mapStateToProps)(Activities);


const style = {
  infoStyle: {
    display: 'inline-block',
    paddingLeft: "12.5%",
    paddingRight: "12.5%",
    marginTop: "3em",
    marginBottom: "3em",
    verticalAlign: 'top',
    height: '15%',
    width: "50%"
  },
  chartStyle: {
    marginTop: '5em',
    display: 'inline-block',
    width: '50%'
  }
}