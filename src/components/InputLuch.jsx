import React from 'react';
import ReactDOM from 'react-dom';
/** tooltip */
import ReactTooltip from 'react-tooltip';
import PlusIcon from 'mdi-react/PlusIcon';
/** timepicker */
import TimePicker from 'rc-time-picker';
/** icons */
import ClockIcon from 'mdi-react/ClockIcon';
import RiceIcon from 'mdi-react/RiceIcon';
import ClockAlertIcon from 'mdi-react/ClockAlertIcon';

import moment from 'moment';

class InputLunch extends React.Component {
  render() {
    const now = moment().hour(12).minute(0);
    return (
      <div className={"newDiaryEntry lunchEntry entry" + this.props.entryIndexProp}>
        {/* start time input */}
        <div className={"inputContainer startTimeContainer startLunch lunch" + this.props.entryIndexProp} data-tip="Start Time...">
          <ClockIcon className="newEntryIcon clockIcon clockLunchIcon" />
          <TimePicker className="lunchTP" placeholder="Start Time..." showSecond={false} defaultOpenValue={now} minuteStep={5} />
        </div>
        {/* lunch input */}
        <div className={"inputContainer lunchContainer lunch" + this.props.entryIndexProp} >
          <RiceIcon className="newEntryIcon lunchIcon" />
          <input value="Lunch" type="text" className="newEntryInput lunchInput" disabled />
        </div>
        {/* end time input */}
        <div className={"inputContainer endTimeContainer endLunch lunch" + this.props.entryIndexProp} data-tip="End Time...">
          <ClockAlertIcon className="newEntryIcon clockIcon clockLunchIcon" />
          <TimePicker placeholder="End Time..." showSecond={false} defaultOpenValue={now} minuteStep={5} />
        </div>

        <ReactTooltip effect="solid" place="bottom" />
      </div>
    );
  }
}

export default InputLunch;