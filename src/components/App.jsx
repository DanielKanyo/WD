import React from 'react';
// Module requires
import Header from './Header.jsx';
import Content from './Content.jsx';
import Footer from './Footer.jsx';

// Create a component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewIndex: 0
    }
    this.updateViewIndex = this.updateViewIndex.bind(this);
  };

  updateViewIndex(val) {
    this.setState({ viewIndex: val });
  };

  render() {
    const { viewIndex } = this.state;
    return (
      <div>
        <Header 
          viewIndexProp={viewIndex} 
          updateViewIndexProp={this.updateViewIndex.bind(this)} 
        />
        <Content 
          viewIndexProp={viewIndex} 
        />
        <Footer />
      </div>
    );
  }
}

export default App;