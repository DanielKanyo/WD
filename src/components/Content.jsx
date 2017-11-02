import React from 'react';
/** tooltip */
import ReactTooltip from 'react-tooltip';
import SwipeableViews from 'react-swipeable-views';

import Diary from './Diary.jsx';

class Content extends React.Component {
  render() {
    return (
      <div className="content">
      <SwipeableViews index={this.props.viewIndexProp}>
        <div className="slideContent">
          <Diary />
        </div>
        <div className="slideContent">
          about
        </div>
        <div className="slideContent">
          statistics
        </div>
        <div className="slideContent">
          throwback
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