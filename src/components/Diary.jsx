import React from 'react';
/** tooltip */
import ReactTooltip from 'react-tooltip';
import PlusIcon from 'mdi-react/PlusIcon';
import RiceIcon from 'mdi-react/RiceIcon'

import InputWork from './InputWork.jsx';
import InputLunch from './InputLuch.jsx';

class Diary extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputListWork: [],
      addNewButtonTooltipText: 'Start the day with a new entry...'
    };
    this.addNewEntry = this.addNewEntry.bind(this);
    this.deleteCurrentEntry = this.deleteCurrentEntry.bind(this);
  }

  addNewEntry(event, string) {
    const inputListWork = this.state.inputListWork;
    const addNewButtonTooltipText = this.state.addNewButtonTooltipText;

    if (inputListWork.length > 0) {
      let penultimateElement = document.getElementsByClassName('delete' + (inputListWork.length - 1));
      penultimateElement[0].className += ' hideDeleteElement';
    }

    if (string == 'work') {
      this.setState({
        inputListWork: inputListWork.concat(<InputWork
          key={inputListWork.length}
          entryIndexProp={inputListWork.length}
          deleteCurrentEntry={this.deleteCurrentEntry.bind(this)} />),
        addNewButtonTooltipText: 'Add new entry...'
      });
    } else if (string == 'lunch') {
      this.setState({
        inputListWork: inputListWork.concat(<InputLunch
          key={inputListWork.length}
          entryIndexProp={inputListWork.length}
          deleteCurrentEntry={this.deleteCurrentEntry.bind(this)} />)
      });
    }
  }

  deleteCurrentEntry(index) {
    let inputListWork = this.state.inputListWork;
    let penultimateElement;

    if (inputListWork.length > 1) {
      penultimateElement = document.getElementsByClassName('delete' + (inputListWork.length - 2));
      penultimateElement[0].classList.remove('hideDeleteElement');
    }
    
    inputListWork.splice(index, 1);
    this.setState({
      inputListWork: inputListWork
    }); 
  }

  render() {
    const addNewButtonTooltipText = this.state.addNewButtonTooltipText;
    return (
      <div className="diaryContent">

        {this.state.inputListWork.map((input, index) => {
          return input;
        })}

        <div className="addNewContainer">

          <button className="addNewBtn pluswork"
            onClick={(e) => this.addNewEntry(e, 'work')}
            data-tip={addNewButtonTooltipText}
            data-delay-show='1000'>
            <PlusIcon />
          </button>

          <button className="addNewBtn plusluch"
            onClick={(e) => this.addNewEntry(e, 'lunch')}
            data-tip='New lunch entry...'
            data-delay-show='1000'>
            <RiceIcon />
          </button>

        </div>

        <ReactTooltip effect="solid" place="bottom" />
      </div>
    );
  }
}

export default Diary;