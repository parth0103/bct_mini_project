import React, { Component } from "react";
// import Typewriter from 'typewriter-effect'
import Typewriter from "react-typewriter-effect";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import picImage from '../images/farmhouse.png'

export default class Home extends Component {
  render() {
    return (
      <div className="bg">
        <div className="home-text">
          Blockchain Based <br/>Land Registry
          <br /> Application
          <div className="typewriter">
            {/* Trustable, Transparent and Digitized Platform
            <br />
            Open for all! Register Now. */}
            <Typewriter
              cursorColor="#fff"
              multiText={[
                "Safe, Trustable and Digitized Platform",
                "Register Now.",
              ]}
            />
          </div>
          
          <hr
            style={{
              border: "8px solid black",
              width: "150px",
              marginLeft: "0px",
            }}
          />
        </div>
        <div className="home-button">
          <button
            style={{ marginRight: "15px" }}
            onClick={() => this.props.history.push("/signup")}
          >
            Register
          </button>{" "}
          <button onClick={() => this.props.history.push("/login")}>
            Login
          </button>
        </div>
        <img className="homeImg" src={picImage} />
      </div>
    );
  }
}
