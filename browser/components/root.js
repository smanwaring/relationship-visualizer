import React, { PropTypes as T } from 'react';
// import styles from './styles.module.css'
import { fetchImage } from '../utils/FetchBackgroundImage';
import axios from 'axios';

const height = window.screen.availHeight;
const width = window.screen.availWidth;


class Root extends React.Component {
  constructor() {
    super()
    this.state = {
      image: ''
    }
  }

  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance from route to children
      });
    }
    return (
      <div style={style.image}>
        <div style={style.layer}>
          {children}
        </div>
      </div>
    );
  }
}

const style = { 
  image: {
    backgroundImage: `url(https://unsplash.it/${width}/${height}/?random)`, 
    width: '100%',
    height: '100%'
  },
  layer: {
    zIndex: '1',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'fixed',
    overflow: 'auto',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%'
  }
}

export default Root;
