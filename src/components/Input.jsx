import React from 'react';
import ReactDOM from 'react-dom';
/** tooltip */
import ReactTooltip from 'react-tooltip';
import PlusIcon from 'mdi-react/PlusIcon';

import TimePicker from 'rc-time-picker';  

class Input extends React.Component {
  render() {
    return (
      <div className={"newDiaryEntry entry" + this.props.entryIndexProp}>
        <div className={"inputContainer startTimeContainer start" + this.props.entryIndexProp}>
          <TimePicker placeholder="Start Time..." showSecond={false} />
        </div>
      </div>
    );
  }
}

export default Input;