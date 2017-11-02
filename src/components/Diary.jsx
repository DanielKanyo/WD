import React from 'react';
/** tooltip */
import ReactTooltip from 'react-tooltip';
import PlusIcon from 'mdi-react/PlusIcon';

import Input from './Input.jsx';

class Diary extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputList: [],
      addNewButtonTooltipText: 'Start the day with a new entry...'
    };
    this.addNewEntry = this.addNewEntry.bind(this);
  }

  addNewEntry(event) {
    const inputList = this.state.inputList;
    const addNewButtonTooltipText = this.state.addNewButtonTooltipText;
    this.setState({
      inputList: inputList.concat(<Input key={inputList.length} entryIndexProp={inputList.length} />),
      addNewButtonTooltipText: 'Add new entry...'
    });
  }

  render() {
    const addNewButtonTooltipText = this.state.addNewButtonTooltipText;
    return (
      <div className="diaryContent">
        {this.state.inputList.map((input, index) => {
          return input;
        })}
        <button className="addNewBtn" onClick={this.addNewEntry} data-tip={addNewButtonTooltipText} data-delay-show='1000'>
          <PlusIcon />
        </button>
        <ReactTooltip effect="solid" place="bottom" />
      </div>
    );
  }
}

export default Diary;