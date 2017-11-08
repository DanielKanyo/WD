import React from 'react';
import ReactDOM from 'react-dom';
/** tooltip */
import ReactTooltip from 'react-tooltip';
import PlusIcon from 'mdi-react/PlusIcon';
/** timepicker */
import TimePicker from 'rc-time-picker';
/** icons */
import ClockIcon from 'mdi-react/ClockIcon';
import FolderOutlineIcon from 'mdi-react/FolderOutlineIcon';
import AccountMultipleIcon from 'mdi-react/AccountMultipleIcon';
import PoundIcon from 'mdi-react/PoundIcon';
import CommentTextOutlineIcon from 'mdi-react/CommentTextOutlineIcon';
import MessageTextOutlineIcon from 'mdi-react/MessageTextOutlineIcon'; 

class Input extends React.Component {
  render() {
    return (
      <div className={"newDiaryEntry entry" + this.props.entryIndexProp}>
        {/* start time input */}
        <div className={"inputContainer startTimeContainer start" + this.props.entryIndexProp} data-tip="Start Time...">
          <ClockIcon className="newEntryIcon clockIcon" />
          <TimePicker placeholder="Start Time..." showSecond={false} />
        </div>
        {/* project name input */}
        <div className={"inputContainer projectContainer project" + this.props.entryIndexProp} data-tip="Project name...">
          <FolderOutlineIcon className="newEntryIcon projectFolderIcon" />
          <input placeholder="Project..." type="text" className="newEntryInput projectInput" />
        </div>
        {/* product owner input */}
        <div className={"inputContainer productOwnerContainer owner" + this.props.entryIndexProp} data-tip="Product owner...">
          <AccountMultipleIcon className="newEntryIcon productOwnerIcon" />
          <input placeholder="Product owner..." type="text" className="newEntryInput ownerInput" />
        </div>
        {/* task number input */}
        <div className={"inputContainer taskNumberContainer number" + this.props.entryIndexProp} data-tip="Task number...">
          <PoundIcon className="newEntryIcon taskNumberIcon" />
          <input placeholder="Task number..." type="number" className="newEntryInput numberInput" />
        </div>
        {/* description input */}
        <div className={"inputContainer descriptionContainer description" + this.props.entryIndexProp} data-tip="Description...">
          <MessageTextOutlineIcon className="newEntryIcon descriptionIcon" />
          <input placeholder="Description..." type="text" className="newEntryInput descriptionInput" />
        </div>

        <ReactTooltip effect="solid" place="bottom" />
      </div>
    );
  }
}

export default Input;