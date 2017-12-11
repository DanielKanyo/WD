import React from 'react';
/** tooltip */
import ReactTooltip from 'react-tooltip';
import SwipeableViews from 'react-swipeable-views';

import Diary from './Diary.jsx';
import About from './About.jsx';

class Content extends React.Component {
  render() {
    return (
      <div className="content">
      <SwipeableViews index={this.props.viewIndexProp}>
        <div className="slideContent">
          <Diary />
        </div>
        <div className="slideContent">
          throwback
        </div>
        <div className="slideContent">
          <About />
        </div>
        <div className="slideContent">
          statistic
        </div>
        <div className="slideContent">
          login
        </div>
      </SwipeableViews>
    </div>
    );
  }
}

export default Content;