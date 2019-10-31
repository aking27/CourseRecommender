import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CourseSections from './CourseSections';
import 'bootstrap/dist/css/bootstrap.min.css';
import Interest from './Interest.js';

class Course extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        sectionList: [],
        like: true,
      }
      // this.changeColor = this.changeColor.bind(this);
    }
    buttonClick(){
      // this.setState({like: false}); //change true -> false and vice versa
      this.props.onAddCourse(this.props.data.name);
    }
  render() {
      // let btnColor = this.props.buttonColor ? "success" : "dark";
      var btnColor = "success";

      if(this.props.buttonColor == false){
        btnColor = "dark";

      }
console.log(this.props.buttonColor);
    return (
              <>

{/*You could use style={{display: 'flex', flexDirection: 'row'}}
on the CardDeck and then put style={{flex: 1}} on the card.

On button click -- change the color to just the outline
<button type="button" class="btn btn-outline-danger">Danger</button>
A better way would be to do the inital state and set state (on click event)

App -- do the algorithm in there, maybe send more information to app like keywords or something
,
this.setState({likeButton: "btn btn-secondary"})

<Button variant="primary">Primary</Button>
()=>this.changeColor()
*/}
<Card style={{width: '75%', marginTop: '5px', marginBottom: '5px'}}>
                        <Card.Body>
                          <Card.Title>{this.props.data.name}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">{this.props.data.number} - {this.getCredits()}</Card.Subtitle>
                          <Button variant="success" onClick={ ()=>this.props.onAddCourse(this.props.data.name) }>Like</Button>
                          <Button variant="secondary"  style={{marginLeft: '5px'}}>Neutral</Button>
                          <Button variant="danger" onClick={()=>this.props.dislikeCourse(this.props.data.name)} style={{marginLeft: '5px'}}>Dislike</Button>
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

export default Course;
