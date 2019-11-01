import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CourseSections from './CourseSections';
import 'bootstrap/dist/css/bootstrap.min.css';

class Keywords extends React.Component {
  render() {
    return (
      <>
        <h5>Keyword: {this.props.data}</h5>
      </>
    )
  }
}

export default Keywords;
