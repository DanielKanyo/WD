import React from "react";
import ReactTooltip from "react-tooltip";

import ContentSaveIcon from "mdi-react/ContentSaveIcon";
import DeleteIcon from "mdi-react/DeleteIcon";
import LockIcon from "mdi-react/LockIcon";

// Create a component
class Tools extends React.Component {

  handleSaveEntrys() {
    this.props.saveEntrys();
  }

  handleCheckIsThereAnyEntry() {
    this.props.checkIsThereAnyEntry();
  }

  handleLockEntrys() {
    this.props.lockEntrys();
  }

  render() {
    return (
      <div className="toolsContainer">
        <div className="saveDiaryEntrysContainer">
          {/* lock */}
          <button
            className="toolTipBtn deleteToolBtn"
            data-tip="Lock entrys"
            data-delay-show="500"
            onClick={this.handleLockEntrys.bind(this)}><LockIcon className="toolIcon" />
          </button>
          {/* delete */}
          <button
            className="toolTipBtn deleteToolBtn"
            data-tip="Delete entrys"
            data-delay-show="500"
            onClick={this.handleCheckIsThereAnyEntry.bind(this)}
            ><DeleteIcon className="toolIcon" />
          </button>
          {/* save */}
          <button
            className="toolTipBtn saveToolBtn"
            data-tip="Save"
            data-delay-show="500"
            onClick={this.handleSaveEntrys.bind(this)}><ContentSaveIcon className="toolIcon" />
          </button>
        </div>

      </div>
    );
  }
}

export default Tools;