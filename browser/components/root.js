import React, { PropTypes as T } from 'react';
// import styles from './styles.module.css'

class Root extends React.Component {
  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance from route to children
      });
    }
    return (
      <div>
        {children}
      </div>
    );
  }
}

export default Root;
