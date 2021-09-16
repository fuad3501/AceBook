import React, { Component } from "react";

class Message extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <>
        <div>
      	  <b>{this.props.name + ": "}</b>
          {this.props.content}
        </div>

        
      </>
    );
  }
}

export default Message;
