import React from 'react';
import './App.css';
import Interest from './Interest';
import Card from 'react-bootstrap/Card';
import Keywords from './Keywords';
import 'bootstrap/dist/css/bootstrap.min.css';



class AreasOfInterest extends React.Component {
  getKeywords() {
    let keywords = [];

    for(const keyword of Object.entries(this.props.data.keywords)) {
      keywords.push (<Keywords key={keyword[0]} data={keyword[1]} callbackFunction={this.callbackFunction}/> );
    }

    return keywords;
  }
  render() {
    return (
      <>
        <Card style={{width: '75%', marginTop: '5px', marginBottom: '5px'}}>
          <Card.Body>
            <Card.Title>{this.getKeywords()}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Rate this group of keywords:</Card.Subtitle>
            <button type="button" class="btn btn-success">Like</button> {/*on click want to send data*/}
            <button type="button" class="btn btn-secondary">Neutral</button>
            <button type="button" class="btn btn-danger" style={{marginLeft: '5px'}}>Dislike</button>
          </Card.Body>
        </Card>
      </>
    )
  }
  getCredits() {
    if(this.props.data.credits === 1)
      return '1 credit';
    else
      return this.props.data.credits + ' credits';
  }
}

export default AreasOfInterest;
