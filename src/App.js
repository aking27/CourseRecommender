import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import CourseArea from './CourseArea';
import AreasOfInterest from './AreasOfInterest';
import Interest from './Interest';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: {},
      filteredCourses: {},
      subjects: [],
      sectionList: [],
      courseName: [],
      dislikeList: []

    };
    this.callbackFunction = this.callbackFunction.bind(this);
    this.onAddCourse = this.onAddCourse.bind(this);
    this.dislikeCourse = this.dislikeCourse.bind(this);
    this.dislikeCallback = this.dislikeCallback.bind(this);

  }
  callbackFunction(childData){
    this.setState({sectionList: this.state.sectionList.concat(childData)});
    // this.setState({courseName: this.state.courseName.concat(data2)});
console.log("like: " + childData + " " + "sectionList length: " + this.state.sectionList.length);
  }
  componentDidMount() {
    fetch('https://mysqlcs639.cs.wisc.edu/classes/').then(
      res => res.json()
    ).then(data => this.setState({allCourses: data, filteredCourses: data}));
  }
  // getSubjects(data) {
  //   let subjects = [];
  //   subjects.push("All");
  //
  //   for(const course of Object.values(data)) {
  //     if(subjects.indexOf(course.subject) === -1)
  //       subjects.push(course.subject);
  //   }
  //
  //   return subjects;
  // }

  // setCourses(courses) {
  //   this.setState({filteredCourses: courses})
  // }
  onAddCourse(childData){
      this.setState({sectionList: this.state.sectionList.concat(childData)});
      // this.props.callbackFunction(childData, this.props.data.name);
      // console.log("childData: " + childData + " " + "sectionList length: " + this.state.sectionList.length);
  }
  dislikeCourse(childData){ // course that's disliked -- might not need this in APP
    this.setState({dislikeList: this.state.dislikeList.concat(childData)});
    this.props.dislikeCallback(childData);
  }
  dislikeCallback(childData){
    this.setState({dislikeList: this.state.dislikeList.concat(childData)});
    // this.setState({courseName: this.state.courseName.concat(data2)});
console.log("dislike: " + childData + " " + "dislikeList length: " + this.state.dislikeList.length);
  }
  render() {
    return (
      <>

        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
{/**/}
      {/*Sidebar setCourses={(courses) => this.setCourses(courses)} courses={this.state.allCourses} subjects={this.state.subjects} cartData={this.state.sectionList} cartClass={this.state.courseName}/>*/}

        <div style={{marginTop: '10px'}}>
          <Container>
            <Row>
                <Col>
                <h2>Your Previous Classes:</h2>
                  <CourseArea data={this.state.filteredCourses} callbackFunction={this.callbackFunction} onAddCourse={this.onAddCourse}
                  dislikeCourse={this.dislikeCourse} dislikeCallback={this.dislikeCallback}/>
                </Col>
                <Col>
                <h2>Your Areas of Interest:</h2>
                  <Interest data={this.state.filteredCourses}/>
                </Col>
            </Row>
          </Container>
        </div>
        {/*<div style={{marginRight: '20vw'}}>
          <CourseArea data={this.state.filteredCourses} callbackFunction={this.callbackFunction}/>
      {/* </div>*/}
      </>
    )
  }
}

export default App;
