import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

import Style from './Map.css';

const CustomMarker = ({ text, url, comment }) =>{
  return(
    <div className="custom-marker"><p>{text}</p>
      <Link to={{
        pathname: `/entry/${url}`,
        state: { comment: comment  }
      }}>
      </Link>
    </div>

);}
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.pollInterval = null;
    this.url = 'https://marineplasticsdb.herokuapp.com/api/comments';
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
    this.pollInterval && clearInterval(this.pollInterval);
    this.pollInterval = null;
  }
  static defaultProps = {
     center: {lat: 36.965652,lng: -121.954729},
     zoom: 13
   };


   render(){
     const GoogleMapsMarkers = this.state.data.map(comment => (

         <CustomMarker
           key={comment.id}
           lat={comment.lat}
           lng={comment.lon}
           text={comment.beach}
           url={comment._id}
           comment={comment}
         />

       ));
       return (
          <div style={{height: '500px', width: '1248px'}}>
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}

        bootstrapURLKeys={{
        key: ['AIzaSyC0KMFMCzYY0TZKQSSGyJ7gDW6dfBIDIDA']
        }}
      >

        {GoogleMapsMarkers}
      </GoogleMapReact>
        </div>
    );
  }
}
  export default Map;
