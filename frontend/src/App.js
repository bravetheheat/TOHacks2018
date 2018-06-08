import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";

import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";

import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import KeywordForm from "./components/keyword_form";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiYnJhdmV0aGVoZWF0IiwiYSI6ImNqaTNmMnAwYTByMjAzcW50amIwdzc2cHYifQ.nG6ileQvpSg3jXrWZfTfzQ",
  minZoom: 1.5
});

const styles = theme => {};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: [1.5],
      keyword: "",
      markers: [{ lat: 5, lng: 0 }]
    };
    this.socket = io("localhost:5000");
    this.socket.on("tweet", data => {
      if (data.location != null) {
        console.log(data.location);
        let marker = new mapboxgl.Marker()
          .setLngLat(data.location)
          .addTo(this.map);
      }
    });

    this.submit_keyword = this.submit_keyword.bind(this);
  }

  componentDidMount() {}

  submit_keyword(keyword) {
    console.log(keyword);
  }

  addMarker(data) {
    if (data.location != null) {
      console.log(data.location);
      let new_state = this.state.markers.slice();
      new_state.push(data.location);
      this.setState({ new_state });
    }
  }

  render() {
    return (
      <div>
        <KeywordForm callback={this.submit_keyword} />
        <Map
          style="mapbox://styles/bravetheheat/cji3f3v8b1a5w2sphg4xucif1"
          center={[this.state.lng, this.state.lat]}
          zoom={this.state.zoom}
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          onStyleLoad={el => (this.map = el)}
        />
      </div>
    );
  }
}

export default App;
