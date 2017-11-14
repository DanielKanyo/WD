import React from 'react';
import ReactDOM from 'react-dom';
/** tooltip */
import ReactTooltip from 'react-tooltip';
/** timepicker */
import TimePicker from 'rc-time-picker';
/** icons */
import ClockIcon from 'mdi-react/ClockIcon';
import VoiceIcon from 'mdi-react/VoiceIcon';
import ClockAlertIcon from 'mdi-react/ClockAlertIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import FolderOutlineIcon from 'mdi-react/FolderOutlineIcon';
import AccountMultipleIcon from 'mdi-react/AccountMultipleIcon';

import moment from 'moment';

class InputMeeting extends React.Component {

  handleDeleteCurrentEntry(index, e) {
    this.props.deleteCurrentEntry(index);
  }

  render() {
    const now = moment().hour(12).minute(0);
    return (
      <div className={"newDiaryEntry meetingEntry entry" + this.props.entryIndexProp}>
        {/* start time input */}
        <div className={"inputContainer startTimeContainer startMeeting meeting" + this.props.entryIndexProp} data-tip="Start Time...">
          <ClockIcon className="newEntryIcon clockIcon clockMeetingIcon" />
          <TimePicker className="lunchTP" placeholder="Start Time..." showSecond={false} defaultOpenValue={now} minuteStep={5} />
        </div>
        {/* project name input */}
        <div className={"inputContainer projectContainerMeeting projectmeeting" + this.props.entryIndexProp} data-tip="Project name...">
          <FolderOutlineIcon className="newEntryIcon projectFolderIcon projectMeetingIcon" />
          <input placeholder="Project..." type="text" className="newEntryInput projectInput projectMeetingInput" />
        </div>
        {/* product owner input */}
        <div className={"inputContainer productOwnerContainer owner" + this.props.entryIndexProp} data-tip="Product owner...">
          <AccountMultipleIcon className="newEntryIcon productOwnerIcon ownerMeetingIcon" />
          <input placeholder="Product owner..." type="text" className="newEntryInput ownerInput ownerMeetingInput" />
        </div>
        {/* meeting input */}
        <div className={"inputContainer meetingContainer meeting" + this.props.entryIndexProp} >
          <VoiceIcon className="newEntryIcon meetingIcon" />
          <input value="Meeting" type="text" className="newEntryInput meetingInput" disabled />
        </div>
        {/* end time input */}
        <div className={"inputContainer endTimeContainer endMeeting meeting" + this.props.entryIndexProp} data-tip="End Time...">
          <ClockAlertIcon className="newEntryIcon clockIcon clockMeetingIcon" />
          <TimePicker placeholder="End Time..." showSecond={false} defaultOpenValue={now} minuteStep={5} />
        </div>
        {/* delete button */}
        <div
          className={"deleteContainer delete" + this.props.entryIndexProp}
          data-tip="Delete Entry..." onClick={this.handleDeleteCurrentEntry.bind(this, this.props.entryIndexProp)}>
          <div className="del"><CloseIcon className={"deleteIcon" + this.props.entryIndexProp} /></div>
        </div>

        <ReactTooltip effect="solid" place="bottom" />
      </div>
    );
  }
}

export default InputMeeting;