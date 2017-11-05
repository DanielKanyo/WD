import React from 'react';
/** tooltip */
import ReactTooltip from 'react-tooltip';
/** icons */
import InformationOutlineIcon from 'mdi-react/InformationOutlineIcon';
import BookIcon from 'mdi-react/BookIcon';
import TumblrReblogIcon from 'mdi-react/TumblrReblogIcon';
import ChartLineIcon from 'mdi-react/ChartLineIcon';
import CalendarIcon from 'mdi-react/CalendarIcon';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIcon: {
        diary: 'selected'
      },
      temp: 'diary'
    }
  };

  handleUpdateIndexView(val) {
    this.props.updateViewIndexProp(val);
  }

  changeClass(name, event) {
    if (this.state.temp != name) {
      let selected = this.state.selectedIcon;
      selected = {};
      selected[name] = this.state.selectedIcon[name] == "selected" ? "" : "selected";
      this.setState({ selectedIcon: selected });

      this.setState({ temp: name });
    }
  }

  render() {

    const { selectedIcon } = this.state;

    return (
      <div id="header-container">
        <div className="menuBar">
          <div className="title">Work Diary!</div>
          <div className="menu">
            {/* LOGIN BUTTON */}
            <button className="menuBtn LoginBtn" onClick={function () {
              this.handleUpdateIndexView(4);
              this.changeClass('login')
            }.bind(this)
            }>
              <TumblrReblogIcon className={"menuBtnIcon loginIco " + selectedIcon["login"]} />
              <div className={"menuBtnText " + selectedIcon["login"]}>Login</div>
            </button>
            {/* THROWBACK BUTTON */}
            <button className="menuBtn ThrowbackBtn" onClick={function () {
              this.handleUpdateIndexView(3);
              this.changeClass('throwback')
            }.bind(this)
            }>
              <CalendarIcon className={"menuBtnIcon throwbackIco " + selectedIcon["throwback"]} />
              <div className={"menuBtnText " + selectedIcon["throwback"]}>Throwback</div>
            </button>
            {/* DIAGRAM BUTTON */}
            <button className="menuBtn DiagramBtn" onClick={function () {
              this.handleUpdateIndexView(2);
              this.changeClass('diagram')
            }.bind(this)
            }>
              <ChartLineIcon className={"menuBtnIcon " + selectedIcon["diagram"]} />
              <div className={"menuBtnText " + selectedIcon["diagram"]}>Statistics</div>
            </button>
            {/* ABOUT BUTTON */}
            <button className="menuBtn AboutBtn" onClick={function () {
              this.handleUpdateIndexView(1);
              this.changeClass('about')
            }.bind(this)
            }>
              <InformationOutlineIcon className={"menuBtnIcon " + selectedIcon["about"]} />
              <div className={"menuBtnText " + selectedIcon["about"]}>About</div>
            </button>
            {/* DIARY BUTTON */}
            <button className="menuBtn DiaryBtn" onClick={function () {
              this.handleUpdateIndexView(0);
              this.changeClass('diary')
            }.bind(this)
            }>
              <BookIcon className={"menuBtnIcon " + selectedIcon["diary"]} />
              <div className={"menuBtnText " + selectedIcon["diary"]}>Diary</div>
            </button>

          </div>
        </div>
        <div className="datepicker">DatePicker</div>

        <ReactTooltip effect="solid" place="bottom" />
      </div>
    );
  }
}

export default Header;