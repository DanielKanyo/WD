import React from 'react';
import ReactDOM from 'react-dom';

class About extends React.Component {
  render() {
    return (
      <div className="aboutContent">
        <div className="aboutPage aboutPageLeft">
          <div>
            About the application and the developer...
          </div>
        </div>
        <div className="aboutPage aboutPageRight">
          mail
        </div>
      </div>
    );
  }
}

export default About;

