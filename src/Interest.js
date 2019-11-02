import React from 'react';
import './App.css';
import AreasOfInterest from './AreasOfInterest';
import 'bootstrap/dist/css/bootstrap.min.css';

class Interest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likedKeywords: [],
      dislikedKeywords: []
    }
    this.onAddKeyword = this.onAddKeyword.bind(this);
    this.deleteKeyword = this.deleteKeyword.bind(this);
  }

  onAddKeyword(childData){ // keyword that's liked
    this.setState({likedKeywords: this.state.likedKeywords.concat(childData)});
    this.props.interestCallback(childData);
  }
  deleteKeyword(childData){ //keyword that's disliked
    this.setState({dislikedKeywords: this.state.dislikedKeywords.concat(childData)});
    this.props.interestDislikeCallback(childData);

  }
  getAreas() {
    let courses = [];

    for(const course of Object.entries(this.props.data)) {
      courses.push (<AreasOfInterest key={course[0]} data={course[1]} onAddKeyword={this.onAddKeyword}
        deleteKeyword={this.deleteKeyword}/> );
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
