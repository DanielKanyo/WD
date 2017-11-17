import React from 'react';

import ContentSaveIcon from 'mdi-react/ContentSaveIcon';

// Create a component
class Tools extends React.Component {

  handleSaveEntrys() {
    this.props.saveEntrys();
  }

  render() {
    return (
      <div className="toolsContainer">
        <div className="saveDiaryEntrysContainer">
          <button className="saveBtn" onClick={this.handleSaveEntrys.bind(this)}><ContentSaveIcon /></button>
        </div>
      </div>
    );
  }
}

export default Tools;