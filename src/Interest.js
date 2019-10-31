import React from 'react';
import './App.css';
import AreasOfInterest from './AreasOfInterest';
import 'bootstrap/dist/css/bootstrap.min.css';

class Interest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionList: []
    }
    this.callbackFunction = this.callbackFunction.bind(this);
  }
  callbackFunction(childData, data2){
      this.setState({sectionList: this.state.sectionList.concat(childData)});
      this.props.callbackFunction(childData, data2);
  }
  getAreas() {
    let courses = [];

    for(const course of Object.entries(this.props.data)) {
      courses.push (<AreasOfInterest key={course[0]} data={course[1]} callbackFunction={this.callbackFunction}/> );
    }

    return courses;
  }

  render() {
    return (
      <div style={{margin: '10px'}}>
        {this.getAreas()}
      </div>
    )
  }
}

export default Interest;
