import React, { Component } from "react";
import {post} from "../../utilities";


class NewMessage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      content: ""
    };

  }


  render() {
    return (
      <>
        <input type ="text" value={this.state.content}
        onChange={(event) =>{
          let text = event.target.value;
          this.setState({content: text});
      
        }} />

        <button onClick={() => {
          post("/api/newmessage", {content: this.state.content})
          this.setState({content: ""})
        }}>Post</button>
      
        
      </>
    );
  }
}

export default NewMessage;
