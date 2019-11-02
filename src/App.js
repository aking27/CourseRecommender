import React from 'react';
import './App.css';
import CourseArea from './CourseArea';
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
      show: false,
      likedKeywords: [],
      recommendation: [],
      dislikedKeywords: []
    };
    this.callbackFunction = this.callbackFunction.bind(this);
    this.interestCallback = this.interestCallback.bind(this);
    this.onAddCourse = this.onAddCourse.bind(this);
    this.dislikeCourse = this.dislikeCourse.bind(this);
    this.dislikeCallback = this.dislikeCallback.bind(this);
    this.onAddKeyword = this.onAddKeyword.bind(this);
    this.onDeleteKeyword = this.onDeleteKeyword.bind(this);
    this.interestDislikeCallback = this.interestDislikeCallback.bind(this);

  }
  callbackFunction(childData){ //liked course
    this.setState({sectionList: this.state.sectionList.concat(childData)});
    console.log("course like: " + childData);
  }
  dislikeCallback(childData){ // course that's disliked
    this.setState({dislikeList: this.state.dislikeList.concat(childData)});
    console.log("course dislike: " + childData);
  }
  interestCallback(childData){ // liked keyword
    this.setState({likedKeywords: this.state.likedKeywords.concat(childData)});
    console.log("interest like: " + childData);
  }
  interestDislikeCallback(childData){  // disliked keyword
    this.setState({dislikedKeywords: this.state.dislikedKeywords.concat(childData)});
    console.log("interest dislike: " + childData);
  }
  async componentDidMount() {
    const response = await fetch('https://mysqlcs639.cs.wisc.edu/classes/');
    // .then(
      // res => res.json()
    // ).then(data => this.setState({filteredCourses: data}));
    const json = await response.json();
    this.setState({filteredCourses: json});
  }
  onAddKeyword(childData){ // liked keyword
    this.setState({likedKeywords: this.state.likedKeywords.concat(childData)});
  }
  onDeleteKeyword(childData){ // disliked keyword
    this.setState({dislikedKeywords: this.state.dislikedKeywords.concat(childData)});
  }
  onAddCourse(childData){ //liked course
    this.setState({sectionList: this.state.sectionList.concat(childData)});
  }
  dislikeCourse(childData){ // course that's disliked
    this.setState({dislikeList: this.state.dislikeList.concat(childData)});
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
        courses.push (course[1]);
    }
    let recommendation = [];
    for(var index = 0; index < courses.length; index++){ //add the courses and their descriptions
      if(courses[index].subject === this.state.sectionList[1] || courses[index].name === this.state.likedKeywords[1]){
        recommendation.push(courses[index].name + ":" + courses[index].description);
      }
    }
  return recommendation;
}
  render() {
    var recommended = this.courseRecommender();
    var rows = [];

    for (let i = 0; i < recommended.length; i++) { // checks what needs to be displayed
      var disliked = false; //if false, display, else don't
      var dislikedKeywordAdd = false;
       for(let j = 0; j < this.state.dislikeList.length; j++){
         if(recommended[i].split(":")[0] === this.state.dislikeList[j]){ // check if it exists in recommended
           disliked = true; // disliked, so remove from list
         }
       }
       for(let l = 0; l < this.state.dislikedKeywords.length; l++){
         if(recommended[i].split(":")[0] === this.state.dislikedKeywords[l]){ // check if it exists in recommended
           dislikedKeywordAdd = true; //disliked, so remove from list
         }
       }

       if (!disliked && !dislikedKeywordAdd) { //style the display
         rows.push(<h5>{recommended[i].split(":")[0]}</h5>);
         rows.push(<hr style={{borderWidth: '1px', borderColor: '#000000'}}/>);
         rows.push(<p>{recommended[i].split(":")[1]}</p>);
       }
    }
    return (
      <>

        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <div style={{marginTop: '10px'}}>
          <h1 style={{textAlign: 'center'}}>Course Recommender</h1>
          <p style={{textAlign: 'center', marginTop: '20px'}}>Are you stuck trying to decide what courses you should take?</p>
          <p style={{textAlign: 'center'}}>Look no further! Below, is a list of courses you have previously taken. There is also a list of keywords.</p>
          <p style={{textAlign: 'center'}}>For you to get your recommendation, all you need to do is rate your previously taken courses as well as the keyword groups.</p>
          <p style={{textAlign: 'center'}}>Then, click the generate button to see your recommendations!</p>
          <h6 style={{textAlign: 'center', marginBottom: '30px'}}>When making your ratings, double-click the 'Like' or 'Dislike' buttons.</h6>
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
                  <Interest data={this.state.filteredCourses} interestCallback={this.interestCallback} onAddKeyword={this.onAddKeyword}
                  onDeleteKeyword={this.onDeleteKeyword} interestDislikeCallback={this.interestDislikeCallback}/>
                </Col>
                <Col style={{marginLeft:"10px"}}>
                  <h2>Click to generate your recommended courses:</h2>
                  <Modal show={this.state.show}>
                    <Modal.Header>
                      <h4 className="modal-title">Your recommended courses:</h4>
                    </Modal.Header>
                    <Modal.Body>
                      <p>{rows}</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={this.hideModal}>Close</Button>
                    </Modal.Footer>
                  </Modal>
                  <Button variant="primary" style={{marginTop: '5px'}} onClick={this.showModal}>Generate</Button>
                </Col>
            </Row>
          </Container>
        </div>
      </>
    )
  }
}

export default App;
