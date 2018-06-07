import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";

import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiYnJhdmV0aGVoZWF0IiwiYSI6ImNqaTNmMnAwYTByMjAzcW50amIwdzc2cHYifQ.nG6ileQvpSg3jXrWZfTfzQ",
  minZoom: 1.5
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: [1.5],
      markers: [{ lat: 5, lng: 0 }]
    };
    this.map;
    this.socket = io("localhost:5000");
    this.socket.on("tweet", data => {
      if (data.location != null) {
        console.log(data.location);
        let marker = new mapboxgl.Marker()
          .setLngLat(data.location)
          .addTo(this.map);
      }
    });
  }

  componentDidMount() {}

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
