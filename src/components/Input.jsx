import React from 'react';
/** tooltip */
import ReactTooltip from 'react-tooltip';
import PlusIcon from 'mdi-react/PlusIcon';

class Input extends React.Component {
  render() {
    return (
      <div className={"newDiaryEntry entry" + this.props.entryIndexProp}>
        <input placeholder="Your input here" />
      </div>
    );
  }
}

export default Input;