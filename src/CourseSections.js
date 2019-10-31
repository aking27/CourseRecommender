import React from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
class CourseSections extends React.Component {

  getSubsections(){
    let subsections = [];
    for(const subsection of Object.entries(this.props.stuff.subsections)) {
      subsections.push(<div>
                      <p>Name: {subsection[0]}</p>
                      <p>Location: {subsection[1].location}</p>
                    </div>)
    }
    return subsections;
  }
  getTime(){
    let times = [];
    for(const time of Object.entries(this.props.stuff.time)) {
      times.push(<>
                      <p>{time[0]}</p>
                      <p>{time[1]}</p>
                    </>)
    }
    return times;
  }
  getCourses() {
    let courses = [];

    for(const course of Object.entries(this.props.courseInfo)) {
      courses.push (<>
        {course[0]}
        </>
      )
      return courses;
    }
  }
    render() {

      return (
        <>
          <Button variant="success" style={{marginBottom: '15px'}} onClick={()=>this.props.onAddCourse(this.props.keys)}>Add section</Button>
          <h5>Section name: {this.props.keys}</h5>
          <h6>Instructor: </h6> <p>{this.props.stuff.instructor}</p>
          <h6>Location: </h6> <p>{this.props.stuff.location}</p>
          <h6>Section Time: </h6>
          <p>{this.getTime()}</p>
          <h6>Subsections (If they exist): </h6> <p>{this.getSubsections()}</p>
          <hr/>
        </>
      )
    }
  }
export default CourseSections;
