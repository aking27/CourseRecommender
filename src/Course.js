import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class Course extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        sectionList: [],
        like: true,
      }
    }
  render() {
      var btnColor = "success";

      if(this.props.buttonColor === false){
        btnColor = "dark";
      }
    return (
              <>
                      <Card style={{width: '100%', marginTop: '5px', marginBottom: '5px'}}>
                        <Card.Body>
                          <Card.Title>{this.props.data.name}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">{this.props.data.number} - {this.getCredits()}</Card.Subtitle>
                          <Button variant="success" style={{marginLeft: '5px', width: '48%'}} onClick={ ()=>this.props.onAddCourse(this.props.data.subject) }>Like</Button>
                          <Button variant="danger" onClick={()=>this.props.dislikeCourse(this.props.data.name)} style={{marginLeft: '5px', width: '48%'}}>Dislike</Button>
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
