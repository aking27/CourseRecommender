import React from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

class CartCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      courseList: [],
      incrementName: 0,
      incrementSection: []
    }
    this.getData = this.getData.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  getCourseName(){
    let courseName = [];

    for(const name of Object.entries(this.props.cartClass)){
      courseName.push(
        <p>Course Name: {name[1]} <Button variant='danger'>Remove</Button></p>

      )
    }
    return courseName;
  }
  getData(){
    let courseData = [];
    for(const data of Object.entries(this.props.cartData)) {
      courseData.push(<>
                      <p>Section Name: {data[1]} <Button variant='danger'>Remove</Button></p>

                    </>)

    }
    return courseData;
  }

  render() {
    return (
      <>
        <Modal show={this.state.show}>
          <Modal.Header><h4 class="modal-title">Cart</h4>
            <Button variant='danger'>Remove all selections</Button>
          </Modal.Header>
          <Modal.Body>
            <p>Courses and their corresponding sections that you select will show below.
            After adding courses, you can always remove them.</p>
            <p>You selections are listed in the order you added them.</p>
            <p>The first section name under the "Sections" heading corresponds with the first course name under the
            "Courses" heading.</p>
            <h6>Sections:</h6> <p>{this.getData()}</p>
            <hr/>
            <h6>Courses:</h6> <p>{this.getCourseName()}</p>
          </Modal.Body>
          <Modal.Footer>

            <Button variant="secondary" onClick={this.hideModal}>Close</Button>


          </Modal.Footer>
        </Modal>
        <Button variant='success' style={{width: '50%'}} onClick={this.showModal}>View Cart</Button>
      </>

    )
  }
}
export default CartCourses;
