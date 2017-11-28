import React from 'react';
import Request from 'superagent';
/** tooltip */
import ReactTooltip from 'react-tooltip';
/** icons */
import PlusIcon from 'mdi-react/PlusIcon';
import SilverwareIcon from 'mdi-react/SilverwareIcon';
import AccountMultipleIcon from 'mdi-react/AccountMultipleIcon';
import CloseIcon from 'mdi-react/CloseIcon';
/** components */
import InputWork from './InputWork.jsx';
import InputLunch from './InputLuch.jsx';
import InputMeeting from './InputMeeting.jsx';
import Tools from './Tools.jsx';
/** notify */
import Notifications, { notify } from 'react-notify-toast';
/** modal */
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class Diary extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputListOfEntrys: [],
      addNewButtonTooltipText: 'Start the day with a new entry...',
      modalIsOpen: false
    };
    this.addNewEntry = this.addNewEntry.bind(this);
    this.deleteCurrentEntry = this.deleteCurrentEntry.bind(this);
    this.changeTooltipText = this.changeTooltipText.bind(this);
    this.renderEntrys = this.renderEntrys.bind(this);
    this.saveEntrys = this.saveEntrys.bind(this);
    this.getWorkData = this.getWorkData.bind(this);
    this.getMeetingData = this.getMeetingData.bind(this);
    this.getLunchData = this.getLunchData.bind(this);
    this.ajaxCallToSave = this.ajaxCallToSave.bind(this);
    this.warning = this.warning.bind(this);
    this.checkIsThereAnyEntry = this.checkIsThereAnyEntry.bind(this);
    this.deleteEntrys = this.deleteEntrys.bind(this);
    this.lockEntrys = this.lockEntrys.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  addNewEntry(event, string) {
    const inputListOfEntrys = this.state.inputListOfEntrys;
    const addNewButtonTooltipText = this.state.addNewButtonTooltipText;

    this.changeTooltipText(inputListOfEntrys);

    if (inputListOfEntrys.length > 0) {
      let penultimateElement = document.getElementsByClassName('delete' + (inputListOfEntrys.length - 1));
      penultimateElement[0].className += ' hideDeleteElement';
    }

    this.renderEntrys(string, inputListOfEntrys);
  }

  changeTooltipText(inputListOfEntrys) {
    if (inputListOfEntrys.length == 1) {
      this.setState({
        addNewButtonTooltipText: 'Start the day with a new entry...'
      });
    } else {
      this.setState({
        addNewButtonTooltipText: 'Add new entry...'
      });
    }
  }

  renderEntrys(string, inputListOfEntrys) {
    if (string == 'work') {
      this.setState({
        inputListOfEntrys: inputListOfEntrys.concat(<InputWork
          key={inputListOfEntrys.length}
          entryIndexProp={inputListOfEntrys.length}
          deleteCurrentEntry={this.deleteCurrentEntry.bind(this)} />)
      });
    } else if (string == 'lunch') {
      this.setState({
        inputListOfEntrys: inputListOfEntrys.concat(<InputLunch
          key={inputListOfEntrys.length}
          entryIndexProp={inputListOfEntrys.length}
          deleteCurrentEntry={this.deleteCurrentEntry.bind(this)} />)
      });
    } else if (string == 'meeting') {
      this.setState({
        inputListOfEntrys: inputListOfEntrys.concat(<InputMeeting
          key={inputListOfEntrys.length}
          entryIndexProp={inputListOfEntrys.length}
          deleteCurrentEntry={this.deleteCurrentEntry.bind(this)} />)
      });
    }
  }

  deleteCurrentEntry(index) {
    let inputListOfEntrys = this.state.inputListOfEntrys;
    let penultimateElement;

    if (inputListOfEntrys.length > 1) {
      penultimateElement = document.getElementsByClassName('delete' + (inputListOfEntrys.length - 2));
      penultimateElement[0].classList.remove('hideDeleteElement');
    }

    inputListOfEntrys.splice(index, 1);
    this.setState({
      inputListOfEntrys: inputListOfEntrys
    });
  }

  saveEntrys() {
    const inputListOfEntrys = this.state.inputListOfEntrys;

    inputListOfEntrys.map((element, index) => {
      let entryType = element.type.name;
      let dataToSend;

      if (entryType == 'InputWork') {
        dataToSend = this.getWorkData(inputListOfEntrys, index, entryType);
      } else if (entryType == 'InputMeeting') {
        dataToSend = this.getMeetingData(inputListOfEntrys, index, entryType);
      } else {
        dataToSend = this.getLunchData(inputListOfEntrys, index, entryType);
      }

      if (dataToSend != false) {
        this.ajaxCallToSave(dataToSend);
      }

    });
  }

  checkIsThereAnyEntry() {
    const inputListOfEntrys = this.state.inputListOfEntrys;

    if (inputListOfEntrys.length == 0) {
      this.warning('No entry...');
    } else {
      this.openModal();
    }
  }

  deleteEntrys() {
    const inputListOfEntrys = this.state.inputListOfEntrys;

    this.setState({
      inputListOfEntrys: []
    });
    this.closeModal();
  }

  getWorkData(inputListOfEntrys, index, entryType) {
    let dataObject;
    let workStartInputVal, projectInputVal, ownerInputVal, taskNumInputVal, descriptInputVal, workEndInputVal;

    let workTimePickerStart = document.getElementsByClassName('start' + index);
    workStartInputVal = workTimePickerStart[0].children[1].children[0].value;

    projectInputVal = document.getElementsByClassName('projectInput' + index)[0].value;
    ownerInputVal = document.getElementsByClassName('ownerInput' + index)[0].value;
    taskNumInputVal = document.getElementsByClassName('numIn' + index)[0].value;
    descriptInputVal = document.getElementsByClassName('descriptionInput' + index)[0].value;

    let workTimePickerEnd = document.getElementsByClassName('end' + index);
    workEndInputVal = workTimePickerEnd[0].children[1].children[0].value;

    if (!workStartInputVal || !projectInputVal || !ownerInputVal || !taskNumInputVal || !descriptInputVal || !workEndInputVal) {
      this.warning('Fill the input fields...');
      return false;
    } else {
      let date = new Date();

      dataObject = {
        startTime: workStartInputVal,
        project: projectInputVal,
        productOwner: ownerInputVal,
        taskNumber: taskNumInputVal,
        description: descriptInputVal,
        endTime: workEndInputVal,
        date: date,
        entryType: entryType
      };

      return dataObject;
    }
  }

  getMeetingData(inputListOfEntrys, index, entryType) {

  }

  getLunchData(inputListOfEntrys, index, entryType) {

  }

  //save data to the database
  ajaxCallToSave(dataToSend) {

    Request.post('api/diary').send(dataToSend).set('Accept', 'application/json').end(function (err, res) {
      if (err || !res.ok) {
        notify.show('Error!', 'error', 5000);
        let toastNotification = document.getElementsByClassName('toast-notification');
        let toastSpan = toastNotification[0].children[0];
        toastSpan.className += ' toastStyle';

      } else {
        notify.show('Success!', 'success', 5000);
        let toastNotification = document.getElementsByClassName('toast-notification');
        let toastSpan = toastNotification[0].children[0];
        toastSpan.className += ' toastStyle';
      }
    });
  }

  warning(warningInfo) {
    let myColor = { background: '#ff6600' }
    notify.show('Warning! ' + warningInfo, 'custom', 3000, myColor);
    let toastNotification = document.getElementsByClassName('toast-notification');
    let toastSpan = toastNotification[0].children[0];
    toastSpan.className += ' toastStyle';
  }

  lockEntrys() {
    console.log('lock');
  }

  render() {
    const addNewButtonTooltipText = this.state.addNewButtonTooltipText;
    return (
      <div className="diaryContent">
        <div className="tools">
          <Tools
            saveEntrys={this.saveEntrys.bind(this)}
            checkIsThereAnyEntry={this.checkIsThereAnyEntry.bind(this)}
            lockEntrys={this.lockEntrys.bind(this)} />
        </div>

        {this.state.inputListOfEntrys.map((input, index) => {
          return input;
        })}

        <div className="addNewContainer">
          {/* add meeting */}
          <button className="addNewBtn plusmeeting"
            onClick={(e) => this.addNewEntry(e, 'meeting')}
            data-tip='New daily meeting entry...'
            data-delay-show='500'>
            <AccountMultipleIcon />
          </button>
          {/* add work */}
          <button className="addNewBtn pluswork"
            onClick={(e) => this.addNewEntry(e, 'work')}
            data-tip={addNewButtonTooltipText}
            data-delay-show='500'>
            <PlusIcon />
          </button>
          {/* add lunch */}
          <button className="addNewBtn plusluch"
            onClick={(e) => this.addNewEntry(e, 'lunch')}
            data-tip='New lunch entry...'
            data-delay-show='500'>
            <SilverwareIcon />
          </button>

        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          overlayClassName="Overlay"
          className="Modal"
        >

          <div className="modalTitle">Are you sure you?</div>
          <div className="modalCloseContainer">
            <button className="modalCloseBtn" onClick={this.closeModal}><CloseIcon /></button>
          </div>
          <div className="modalExplainContainer">
            <p>If you click on the delete button, you will lost all your entries...</p>
          </div>
          <button className="modalDeleteBtn" onClick={this.deleteEntrys.bind(this)}>DELETE</button>
        </Modal>

        <Notifications options={{ zIndex: 5000 }} />
        <ReactTooltip effect="solid" place="bottom" />
      </div>
    );
  }
}

export default Diary;