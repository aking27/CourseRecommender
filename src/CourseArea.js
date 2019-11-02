import React from 'react';
import './App.css';
import Course from './Course';
import 'bootstrap/dist/css/bootstrap.min.css';

class CourseArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionList: [],
      dislikeList: [],
      buttonColor: true,
    }
     this.onAddCourse = this.onAddCourse.bind(this);
     this.dislikeCourse = this.dislikeCourse.bind(this);
  }
  onAddCourse(childData){ // course that's liked
    this.setState({sectionList: this.state.sectionList.concat(childData)});
    this.props.callbackFunction(childData);
    console.log("like: " + childData);
  }
  dislikeCourse(childData){ // course that's disliked
    this.setState({dislikeList: this.state.dislikeList.concat(childData)});
    this.props.dislikeCallback(childData);
    console.log("dislike: " + childData);
  }

  getCourses() {
    let courses = [];

    for(const course of Object.entries(this.props.data)) {
      courses.push (<Course key={course[0]} data={course[1]} onAddCourse={this.onAddCourse}
        dislikeCourse={this.dislikeCourse}/> );
    }

    return courses;
  }

  render() {

    return (
      <div style={{margin: '5px'}}>
        {this.getCourses()}
      </div>
    )
  }
}

export default CourseArea;
