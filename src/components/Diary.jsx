import React from 'react';
import Request from 'superagent';
/** tooltip */
import ReactTooltip from 'react-tooltip';
/** icons */
import PlusIcon from 'mdi-react/PlusIcon';
import SilverwareIcon from 'mdi-react/SilverwareIcon';
import AccountMultipleIcon from 'mdi-react/AccountMultipleIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import DeleteIcon from "mdi-react/DeleteIcon";
/** components */
import InputWork from './InputWork.jsx';
import InputLunch from './InputLuch.jsx';
import InputMeeting from './InputMeeting.jsx';
import Tools from './Tools.jsx';
/** notify */
import Notifications, { notify } from 'react-notify-toast';
/** modal */
import Modal from 'react-modal';
/* font awesome */
import FontAwesome from 'react-fontawesome';

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

  /** constructor */
  constructor(props) {
    super(props);
    this.state = {
      inputListOfEntrys: [],
      modalIsOpen: false,
      modalTitle: 'title',
      modalExplanation: 'explanation',
      modalIcon: 'icon',
      modalText: 'text',
      modalCloseBtnToggleHide: 'value',
      modalInputToggleHide: 'value',
      modalInputPlaceholder: 'value'
    };
    this.addNewEntry = this.addNewEntry.bind(this);
    this.deleteCurrentEntry = this.deleteCurrentEntry.bind(this);
    this.renderEntrys = this.renderEntrys.bind(this);
    this.saveEntrys = this.saveEntrys.bind(this);
    this.getWorkData = this.getWorkData.bind(this);
    this.getMeetingData = this.getMeetingData.bind(this);
    this.getLunchData = this.getLunchData.bind(this);
    this.ajaxCallToSave = this.ajaxCallToSave.bind(this);

    this.warning = this.warning.bind(this);
    this.success = this.success.bind(this);

    this.checkIsThereAnyEntry = this.checkIsThereAnyEntry.bind(this);
    this.deleteEntrys = this.deleteEntrys.bind(this);
    this.lockEntrys = this.lockEntrys.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
  }

  /** open modal and set the fields */
  openModal(type) {
    if (type == 'delete') {
      this.setState({
        modalIsOpen: true,
        modalTitle: 'Are you sure?',
        modalExplanation: 'If you click on the delete button, you will lost all your entries...',
        modalIcon: 'ban',
        modalText: 'Delete...',
        modalCloseBtnToggleHide: 'show',
        modalInputToggleHide: 'hide'
      });
    } else if (type == 'lock') {
      this.setState({
        modalIsOpen: true,
        modalTitle: 'Screen locked!',
        modalExplanation: 'If you click on the unlock button, you can continue with the editing...',
        modalIcon: 'unlock',
        modalText: 'Unlock...',
        modalCloseBtnToggleHide: 'hide',
        modalInputToggleHide: 'show',
        modalInputPlaceholder: 'Password...'
      });
    }
  }

  /** close modal */
  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  /** add new entry and hide the penultimate delete button  */
  addNewEntry(event, string) {
    const inputListOfEntrys = this.state.inputListOfEntrys;

    if (inputListOfEntrys.length > 0) {
      let penultimateElement = document.getElementsByClassName('delete' + (inputListOfEntrys.length - 1));
      penultimateElement[0].className += ' hideDeleteElement';
    }

    this.renderEntrys(string, inputListOfEntrys);
  }

  /** render the entrys - work, lunch and meeting entrys */
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

  /** delete the most recent entry */
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

  /** data preparing for the save */
  saveEntrys() {
    const inputListOfEntrys = this.state.inputListOfEntrys;

    if (inputListOfEntrys.length == 0) {
      this.warning('Nothing to save...!');
    }

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

  /** warning if the array is empty, if it's not, open the modal */
  checkIsThereAnyEntry(type) {
    const inputListOfEntrys = this.state.inputListOfEntrys;

    if (inputListOfEntrys.length == 0) {
      if (type == 'delete') {
        this.warning('There is no entry that can be deleted...');
      } else if (type == 'lock') {
        this.warning('The locking is unnecessary...');
      }
    } else {
      this.openModal(type);
    }
  }

  /** get data from the input fields - work */
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

      let dateString = document.getElementsByClassName('datePickerInput')[0].value;
      let date = new Date(dateString);

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

  /** get data from the input fields - meeting */
  getMeetingData(inputListOfEntrys, index, entryType) {
    let dataObject;
    let meetingStartInputVal, projectMeetingInputVal, ownerMeetingInputVal, descriptInputVal, meetingEndInputVal;

    let meetingTimePickerStart = document.getElementsByClassName('sMeeting' + index);
    meetingStartInputVal = meetingTimePickerStart[0].children[1].children[0].value;

    projectMeetingInputVal = document.getElementsByClassName('proMeIn' + index)[0].value;
    ownerMeetingInputVal = document.getElementsByClassName('owMeIn' + index)[0].value;
    descriptInputVal = document.getElementsByClassName('meIn' + index)[0].value;

    let meetingTimePickerEnd = document.getElementsByClassName('eMeeting' + index);
    meetingEndInputVal = meetingTimePickerEnd[0].children[1].children[0].value;

    if (!meetingStartInputVal || !projectMeetingInputVal || !ownerMeetingInputVal || !descriptInputVal || !meetingEndInputVal) {
      this.warning('Fill the input fields...');
      return false;
    } else {

      let dateString = document.getElementsByClassName('datePickerInput')[0].value;
      let date = new Date(dateString);

      dataObject = {
        startTime: meetingStartInputVal,
        project: projectMeetingInputVal,
        productOwner: ownerMeetingInputVal,
        description: descriptInputVal,
        endTime: meetingEndInputVal,
        date: date,
        entryType: entryType
      };

      return dataObject;
    }
  }

  /** get data from the input fields - lunch */
  getLunchData(inputListOfEntrys, index, entryType) {
    let dataObject;
    let lunchStartInputVal, descriptInputVal, lunchEndInputVal;

    let lunchTimePickerStart = document.getElementsByClassName('slunch' + index);
    lunchStartInputVal = lunchTimePickerStart[0].children[1].children[0].value;

    descriptInputVal = document.getElementsByClassName('lunchDes' + index)[0].value;

    let lunchTimePickerEnd = document.getElementsByClassName('elunch' + index);
    lunchEndInputVal = lunchTimePickerEnd[0].children[1].children[0].value;

    if (!lunchStartInputVal || !descriptInputVal || !lunchEndInputVal) {
      this.warning('Fill the input fields...');
      return false;
    } else {

      let dateString = document.getElementsByClassName('datePickerInput')[0].value;
      let date = new Date(dateString);

      dataObject = {
        startTime: lunchStartInputVal,
        description: descriptInputVal,
        endTime: lunchEndInputVal,
        date: date,
        entryType: entryType
      };

      return dataObject;
    }

  }

  /** save data to the database */
  ajaxCallToSave(dataToSend) {
    Request.post('api/diary').send(dataToSend).set('Accept', 'application/json').end(function (err, res) {
      if (err || !res.ok) {
        notify.show('Error!', 'error', 5000);
        let toastNotification = document.getElementsByClassName('toast-notification');
        let toastSpan = toastNotification[0].children[0];
        toastSpan.className += ' toastStyle';

      } else {
        this.success('Success!');
      }
    });
  }

  /** warning toast */
  warning(warningInfo) {
    let myColor = { background: '#ff6600' }
    notify.show('Warning! ' + warningInfo, 'custom', 3000, myColor);
    let toastNotification = document.getElementsByClassName('toast-notification');
    let toastSpan = toastNotification[0].children[0];
    toastSpan.className += ' toastStyle';
  }

  /** sucess toast */
  success(successInfo) {
    notify.show(successInfo, 'success', 5000);
    let toastNotification = document.getElementsByClassName('toast-notification');
    let toastSpan = toastNotification[0].children[0];
    toastSpan.className += ' toastStyle';
  }

  /** delete all entrys */
  deleteEntrys() {
    const inputListOfEntrys = this.state.inputListOfEntrys;

    this.setState({
      inputListOfEntrys: []
    });
    this.closeModal();
  }

  /** unlock function */
  lockEntrys(type) {
    let adminPassword = 'admin';
    let modalInput = document.getElementsByClassName('modalInput')[0];
    let modalInputValue = modalInput.value;

    if (modalInputValue == '') {
      this.setState({
        modalInputPlaceholder: 'Fill this input field...'
      });
      modalInput.style.borderBottomColor = "red";
    } else if (modalInputValue != adminPassword) {
      this.setState({
        modalInputPlaceholder: 'Wrong password...'
      });
      modalInput.style.borderBottomColor = "red";
    } else {
      this.closeModal();
    }
  }

  /** the function of the button on the modal */
  handleModalClick(e) {
    let modalBtnValue = e.target.innerText;

    if (modalBtnValue == 'Delete...') {
      this.deleteEntrys();
    } else if (modalBtnValue == 'Unlock...') {
      this.lockEntrys();
    }
  }

  render() {
    const addNewButtonTooltipText = this.state.addNewButtonTooltipText;

    return (
      <div className="diaryContent">
        <div className="tools">
          <Tools
            saveEntrys={this.saveEntrys.bind(this)}
            checkIsThereAnyEntry={this.checkIsThereAnyEntry.bind(this)} />
        </div>

        {this.state.inputListOfEntrys.map((input, index) => {
          return input;
        })}

        <div className="addNewContainer">
          {/* add meeting */}
          <button className="addNewBtn plusmeeting"
            onClick={(e) => this.addNewEntry(e, 'meeting')}
            data-tip="New daily meeting entry..."
            data-delay-show="500">
            <AccountMultipleIcon />
          </button>
          {/* add work */}
          <button className="addNewBtn pluswork"
            onClick={(e) => this.addNewEntry(e, "work")}
            data-tip="Add new entry..."
            data-delay-show="500">
            <PlusIcon />
          </button>
          {/* add lunch */}
          <button className="addNewBtn pluslunch"
            onClick={(e) => this.addNewEntry(e, "lunch")}
            data-tip="New lunch entry..."
            data-delay-show="500">
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
          shouldCloseOnOverlayClick={false}
          closeTimeoutMS={400}
        >

          <div className="modalTitle">{this.state.modalTitle}</div>
          <div className="modalCloseContainer">
            <button className={"modalCloseBtn " + this.state.modalCloseBtnToggleHide} onClick={this.closeModal}>
              <CloseIcon />
            </button>
          </div>
          <div className="modalExplainContainer">
            <p>{this.state.modalExplanation}</p>
          </div>
          <div className="passwdContainer">
            <input
              type="password"
              className={"modalInput " + this.state.modalInputToggleHide}
              placeholder={this.state.modalInputPlaceholder}
              autoFocus />
          </div>
          <button className="modalBtn" onClick={this.handleModalClick}>
            <FontAwesome name={this.state.modalIcon} className="fontAwesomeIcon" />
            {this.state.modalText}
          </button>
        </Modal>

        <Notifications options={{ zIndex: 5000 }} />
        <ReactTooltip effect="solid" place="bottom" />
      </div>
    );
  }
}

export default Diary;