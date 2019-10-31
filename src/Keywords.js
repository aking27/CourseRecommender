import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CourseSections from './CourseSections';
import 'bootstrap/dist/css/bootstrap.min.css';

class Keywords extends React.Component {
eachKeyword(){
  //make a for loop to get each keywords
  //if that doesn't work, group them together and have the user rate them as a group fuck them
}
  render() {
    return (
      <>
        <h5>Keyword: {this.props.data}</h5>

      </>
    )
  }
}

export default Keywords;
