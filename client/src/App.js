import * as React from 'react';
import Map, {Marker, NavigationControl, Popup, GeolocateControl} from 'react-map-gl';
import "./App.css"
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from "axios";
import {useEffect, useState} from "react";

function App() {
    const [viewState, setViewState] = React.useState({
        latitude: 37.8,
        longitude: -122.4,
        zoom: 6
    });
    const [showPopup, setShowPopup] = React.useState(true);
    const [posts, setPosts] = useState([]);
    const [currentPlaceId, setCurrentPlaceId] = useState(null)


    useEffect(() => {
        const getPosts = async ()=>{
            try {
                const res = await axios.get("/post");
                setPosts(res.data)
                {console.log(res.data)}
            }catch (err){
                console.log(err)
            }
        }
        getPosts();
    }, []);

    const handleMarkerClick= (id) => {
        setCurrentPlaceId(id)
    }

  return (
    <div className="App">
        <Map{...viewState}
            onMove={evt => setViewState(evt.viewState)}
            style={{ height: '100vh', width: '100vw'}}
            mapStyle="mapbox://styles/mapbox/navigation-night-v1"
            mapboxAccessToken={process.env.REACT_APP_MAPBOX}>

            {posts.map(singlePost =>(
                <>
                    {parseFloat(singlePost.latitude)}
                    {parseFloat(singlePost.longitude)}
            <Marker
                longitude={singlePost.longitude}
                latitude={singlePost.latitude}
                anchor="top"
            >
                <Room
                    style={{
                        fontSize: 7 * viewState.zoom,}}
                    onClick={handleMarkerClick(singlePost.id)}
                />

            </Marker>
                    {singlePost.id === currentPlaceId && (
                        <Popup longitude={singlePost.longitude} latitude={singlePost.latitude}
                               anchor="left"
                               onClose={() => setShowPopup(false)}>
                            <div className="card">
                                <label>Place</label>
                                <h4 className="place">{singlePost.title}</h4>
                                <label>Content</label>
                                <p>{singlePost.post}</p>
                                <label>Information</label>
                                <span className="date">{singlePost.createdAt}</span>
                            </div>
                        </Popup>
                        )}
                    </>
                ))}

            <GeolocateControl />
            <NavigationControl />
        </Map>
    </div>
  );
}

export default App;
