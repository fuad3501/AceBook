import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import LoginButton from "./pages/LoginButton.js";
import NewMessage from "./modules/NewMessage.js";
import Message from "./modules/Message";
import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      messages: []
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });

    get("/api/allmessages").then((allMessages) => {
      this.setState({ messages: allMessages})
    })
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  render() {
    return (
      <>
        <LoginButton 
          handleLogin = {this.handleLogin}
          handleLogout = {this.handleLogout}
          userId = {this.state.userId}
        />
          <h1>Welcome to AceBook</h1>
          <NewMessage/>
          {this.state.messages.map((message) => (
            <Message name={message.name} content={message.content} />
          ))}
        
      </>
    );
  }
}
export default App;
