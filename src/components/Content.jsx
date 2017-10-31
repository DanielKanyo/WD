import React from 'react';
/** tooltip */
import ReactTooltip from 'react-tooltip';
import SwipeableViews from 'react-swipeable-views';

import Diary from './Diary.jsx';

class Content extends React.Component {
  render() {
    return (
      <div className="content">
      <SwipeableViews index={this.props.viewIndexProp} enableMouseEvents >
        <div className="slideContent diaryContent">
          <Diary />
        </div>
        <div className="slideContent aboutContent">
          about
        </div>
        <div className="slideContent staticContent">
          statistics
        </div>
        <div className="slideContent loginContent">
          login
        </div>
      </SwipeableViews>
    </div>
    );
  }
}

export default Content;