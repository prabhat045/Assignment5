import React, { Component } from "react";
import "./App.css";
import watersolid from "./watersolid.svg";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      city: "",
      dis: "none",
      temp: "",
      maxtemp: "",
      mintemp: "",
      city1: "",
      weather: "",
      wind: "",
      humidity: "",
      pressure: "",
      sunrise: "",
      sunset: "",
      loading: "Searching City name...",
      country: "",
      show: false,
      start: false,
      index: 0,
      comment: "",
      listofcomment: [],
    };
  }

  setName = (event) => {
    console.log(this.state.city);
    this.setState({
      city: event.target.value,
    });
  };

  setComment = (event) => {
    this.setState({
      comment: event.target.value,
    });
    console.log(this.state.comment);
  };

  postComment = () => {
    if (this.state.comment !== "") {
      let temp = {
        comment: this.state.comment,
      };
      this.setState({
        listofcomment: [...this.state.listofcomment, temp],
        index: this.state.index + 1,
        comment: "",
      });
    }
  };

  getDetails = async () => {
    this.setState({
      show: false,
      start: true,
      loading: "Searching City name...",
    });
    const API_KEY = "dd561686933630f82aac6b50b0302cd3";
    const fromapi = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=london,uk&appid=${API_KEY}&units=imperial`
    );

    if (fromapi.ok) {
      const data = await fromapi.json();
      this.setState({
        temp: data.main.temp,
        weather: data.weather[0].main,
        wind: data.wind.speed,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        maxtemp: data.main.temp_max,
        mintemp: data.main.temp_min,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        name: data.name,
        country: data.sys.country,
        show: true,
      });
    } else {
      this.setState({
        loading: "City Name not found",
      });
    }
  };

  render() {
    let com = this.state.listofcomment.map((eachEntry, index) => (
      <p>
        <i className='fa fa-user'></i>
        {eachEntry.comment}
      </p>
    ));

    return (
      <div className='app-body'>
        <span id='input'>
          <input
            type='text'
            onChange={(event) => this.setName(event)}
            value={this.state.city}
            id='searchBar'
            placeholder='Enter City Name...'
          />
          <button id='searchButton' onClick={this.getDetails}>
            Search
          </button>
        </span>

        {this.state.show && (
          <div className='weather-div'>
            <p className='city'>
              {this.state.name},{this.state.country},
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </p>
            <div className='container'>
              <span className='temp'>
                <p>
                  {(((this.state.temp - 32) * 5) / 9).toFixed(1)}
                  <sup>o</sup>C{" "}
                  <img src={watersolid} id='water' alt='water-solid' />
                </p>
              </span>

              <span className='details'>
                <p>
                  Weather:<b>{this.state.weather}</b>
                  <br />
                  Wind:<b>{this.state.wind} km/h</b>
                </p>
                <p>
                  Humidity:<b>{this.state.humidity}%</b>
                  <br />
                  Pressure:<b>{this.state.pressure} Pa</b>
                </p>
                <p>
                  Max Temp:
                  <b>
                    {(((this.state.maxtemp - 32) * 5) / 9).toFixed(1)}
                    <sup>o</sup>C
                  </b>
                  <br />
                  Min Temp:
                  <b>
                    {(((this.state.mintemp - 32) * 5) / 9).toFixed(1)}
                    <sup>o</sup>C
                  </b>
                </p>
                <p>
                  Sunrise:{" "}
                  <b>
                    {new Date(this.state.sunrise * 1000).toLocaleTimeString(
                      "en-GB"
                    )}
                  </b>
                  <br />
                  Sunset:{" "}
                  <b>
                    {new Date(this.state.sunset * 1000).toLocaleTimeString(
                      "en-GB"
                    )}
                  </b>
                </p>
              </span>
            </div>
          </div>
        )}
        {!this.state.show && this.state.start && (
          <div id='loading'>{this.state.loading}</div>
        )}

        {this.state.show && (
          <div id='comment_container'>
            <textarea
              rows='4'
              columns='500'
              id='textarea'
              placeholder='Enter your comment here...'
              onChange={(event) => this.setComment(event)}
              value={this.state.comment}
            />
            <br />
            <button id='searchButton' onClick={this.postComment}>
              Comment
            </button>
            <br />
            <div id='comments'>
              <p style={{ color: "#484848" }}>
                <b>Comments({this.state.index})</b>
              </p>
              {com}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
