import * as React from 'react';
import {render} from 'react-dom';
import Map, {Marker} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
    const [viewState, setViewState] = React.useState({
        latitude: 37.8,
        longitude: -122.4,
        zoom: 14
    });
  return (
    <div className="App">
        <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            style={{ height: '100vh', width: '100vw'}}
            mapStyle="mapbox://styles/mapbox/navigation-night-v1"
            mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        >
            <Marker longitude={-122.4} latitude={37.8} color="red" />
        </Map>
    </div>
  );
}

export default App;
