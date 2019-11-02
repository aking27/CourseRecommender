import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Keywords extends React.Component {
  render() {
    return (
      <>
        <h5>{this.props.data}</h5>
      </>
    )
  }
}

export default Keywords;
