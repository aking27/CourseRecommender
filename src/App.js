import React from 'react';
import './App.css';
import CourseArea from './CourseArea';
import AreasOfInterest from './AreasOfInterest';
import Interest from './Interest';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal';

class App extends React.Component {
// Notes -- get the recommended courses to appear like they did in the previous
// react assignment (the information for each class)
// Need to send data from the keyword component to APP (here)
// Basis for recommendation algo -- try and grab the subject from each liked course
// Then, compare the subject with the database and include all classes with that
// subject.

  constructor(props) {
    super(props);
    this.state = {
      filteredCourses: {},
      subjects: [],
      sectionList: [],
      courseName: [],
      dislikeList: [],
      show: false
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
  async componentDidMount() {
    const response = await fetch('https://mysqlcs639.cs.wisc.edu/classes/');
    // .then(
      // res => res.json()
    // ).then(data => this.setState({filteredCourses: data}));
    const json = await response.json();
    this.setState({filteredCourses: json});
  }
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

  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }
  courseRecommender(){

    let courses = [];

    for(const course of Object.entries(this.state.filteredCourses)) {

      //  console.log("check");
      // if(course[1].subject === this.state.sectionList[1]){
        courses.push (course[1]);
      // }
    }
    // let iterate = this.state.sectionList.length;
    // let liked = [];
    // for(const course of iterate) {
    //   liked.push (this.state.sectionList[course]);
    //   if(this.state.sectionList[course] == this.state.filteredCourses.subject){
    //     console.log("APP");
    //   }
    //
    // }
    // let recommendation = "Programming 1";
    // console.log(this.state.sectionList[1]);
    // if(this.state.sectionList[1] === recommendation){
    //   return this.state.sectionList;
    // }
    // return courses;
    let recommendation = [];
    let test;
    for(var index = 0; index < courses.length; index++){

      if(courses[index].subject === this.state.sectionList[1]){
        if(recommendation.length == 0){
          recommendation.push(courses[index].name);
        }
        recommendation.push(", " + courses[index].name);
        test = courses[index].name;
        console.log(courses[index].name);
      }
    }
    return recommendation;
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
          <h1 style={{textAlign: 'center'}}>Course Recommender</h1>
          <p style={{textAlign: 'center', marginTop: '20px'}}>Are you stuck trying to decide what courses you should take?</p>
          <p style={{textAlign: 'center'}}>Look no further! Below, is a list of courses you have previously taken. There is also a list of keywords.</p>
          <p style={{textAlign: 'center'}}>For you to get your recommendation, all you need to do is rate your previously taken courses as well as the keyword groups.</p>
          <p style={{textAlign: 'center'}}>Then, click the generate button to see your recommendations!</p>
        </div>
        <div style={{marginTop: '20px'}}>
          <Container>
            <Row className="justify-content-md-center">
                <Col>
                  <h2 style={{marginBottom:'20px', textAlign: 'center'}}>Your Previous Classes:</h2>
                  <CourseArea data={this.state.filteredCourses} callbackFunction={this.callbackFunction} onAddCourse={this.onAddCourse}
                  dislikeCourse={this.dislikeCourse} dislikeCallback={this.dislikeCallback}/>
                </Col>
                <Col>
                  <h2 style={{marginBottom:'20px', textAlign: 'center'}}>Your Areas of Interest:</h2>
                  <Interest data={this.state.filteredCourses}/>
                </Col>
                <Col style={{marginLeft:"10px"}}>
                  <h2>Click to generate your recommended courses:</h2>
                  <Modal show={this.state.show}>
                    <Modal.Header>
                      <h4 class="modal-title">Your recommended courses:</h4>
                    </Modal.Header>
                    <Modal.Body>
                      {this.courseRecommender()}
                      <p>state: </p>{this.state.sectionList}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={this.hideModal}>Close</Button>
                    </Modal.Footer>
                  </Modal>
                  <Button variant="primary" style={{marginTop: '5px', marginLeft: '10px'}} onClick={this.showModal}>Generate</Button>
                </Col>
            </Row>
          </Container>
        </div>
      </>
    )
  }
}

export default App;
