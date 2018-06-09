import React, { Component } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker, 
  SearchBox,
  InfoWindow
} from "react-google-maps";

import { Link } from 'react-router-dom';

const MapComponent = withScriptjs(withGoogleMap((props) =>
<GoogleMap
  defaultZoom={12}
  defaultCenter={{ lat: 36.976652, lng: -121.932416 }}
>

{props.markers.map(marker => (
  <Marker 
    key={marker.id} 
    position={{ lat: marker.lat, lng: marker.lon}}
    onClick={() => this.props.handleToggleOpen()}
    onMouseOver={() =>props.onMarkerHover(marker)}>
    {props.infobox &&
                    <InfoWindow
                      onCloseClick={() => props.handleToggleClose(props.infobox)}
                        options={{pixelOffset: new google.maps.Size(0,-30)}} >
                      <span>beachname</span>
                    </InfoWindow>
            }
  </Marker>))  }

</GoogleMap>
));


class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], isOpen: false };
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.handleToggleOpen = this.handleToggleOpen.bind(this);
    this.handleToggleClose = this.handleToggleClose.bind(this);
    // this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerHover = this.handleMarkerHover.bind(this);
    this.pollInterval = null;
    this.url = 'https://marineplasticsdb.herokuapp.com/api/comments';
  
  }
  handleToggleOpen = () => {
    this.setState({ isOpen: true});
 }

 handleToggleClose = (infobox) => {
      infobox = false;
 }
  loadCommentsFromServer() {
    axios.get(this.url)
      .then(res => {
        this.setState({ data: res.data });
      })
  }
  componentDidMount() {
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadCommentsFromServer, 2000)
    }
  }
  //when incorporating into another project
  //(with react-router for instance),
  //this will prevent error messages every 2 seconds
  //once the SurveyBox is unmounted
  componentWillUnmount() {
    // eslint-disable-next-line
    this.pollInterval && clearInterval(this.pollInterval);
    this.pollInterval = null;
  }
  // handleMarkerClick = (marker) => {
  //   console.log(marker.beach);
  //   <InfoWindow>
  //           options={{pixelOffset: new google.maps.Size(0,-30)}}
  //     <div>Hello</div>
  //   </InfoWindow> 
  // 
  // }
  handleMarkerHover=(marker)=>{
    console.log(marker);
  }
  
  render() {
    return (
      <div>
        <MapComponent
          markers={this.state.data}
          infobox={this.state.isOpen}
          beachname={this.state.data.name}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC0KMFMCzYY0TZKQSSGyJ7gDW6dfBIDIDA"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `600px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          onMarkerHover={this.handleMarkerHover}
        />
      </div>
    )
  }
}

export default Map;