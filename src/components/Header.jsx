import React from 'react';
/** tooltip */
import ReactTooltip from 'react-tooltip';
/** icons */
import InformationOutlineIcon from 'mdi-react/InformationOutlineIcon';
import BookOpenVariantIcon from 'mdi-react/BookOpenVariantIcon';
import TumblrReblogIcon from 'mdi-react/TumblrReblogIcon';

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
        <div className="title">Work Diary!</div>
        <div className="menu">

          <button className="menuBtn LoginBtn" onClick={function () {
            this.handleUpdateIndexView(2);
            this.changeClass('login')
          }.bind(this)
          }>
            <TumblrReblogIcon className={"menuBtnIcon loginIco " + selectedIcon["login"]} />
            <div className={"menuBtnText " + selectedIcon["login"]}>Login</div>
          </button>

          <button className="menuBtn AboutBtn" onClick={function () {
            this.handleUpdateIndexView(1);
            this.changeClass('about')
          }.bind(this)
          }>
            <InformationOutlineIcon className={"menuBtnIcon " + selectedIcon["about"]} />
            <div className={"menuBtnText " + selectedIcon["about"]}>About</div>
          </button>

          <button className="menuBtn DiaryBtn" onClick={function () {
            this.handleUpdateIndexView(0);
            this.changeClass('diary')
          }.bind(this)
          }>
            <BookOpenVariantIcon className={"menuBtnIcon " + selectedIcon["diary"]} />
            <div className={"menuBtnText " + selectedIcon["diary"]}>Diary</div>
          </button>

        </div>
      </div>
    );
  }
}

export default Header;