import * as React from 'react';
import Map, {Marker, NavigationControl, Popup, GeolocateControl} from 'react-map-gl';
import "./App.css"
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from "axios";
import {useEffect, useState} from "react";
import { ArrowDropDownCircle} from "@material-ui/icons";

function App() {
    const [viewState, setViewState] = React.useState({
        latitude: 37.8,
        longitude: -122.4,
        zoom: 6
    });
    const [showPopup, setShowPopup] = React.useState(true);
    const [posts, setPosts] = useState([]);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);
    const [newPlace, setNewPlace] = useState(null);


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

    const handleMarkerClick = (id, lat, long) => {
        setCurrentPlaceId(id);
/*
        setViewState({ ...viewState, latitude: lat, longitude: long });
*/
    };

/*    const handleAddClick = (e) => {
        const [longitude, latitude] = e.lngLat;
        setNewPlace({
            latitude,
            longitude,
        });
    };*/

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
                            rotation="180"
                            pitchAlignment="map"
                        >
                            <ArrowDropDownCircle
                                style={{
                                    fontSize: 6 * viewState.zoom,
                                    cursor: "pointer",
                                    color:"white"
                                }}
                                onMouseEnter={() => handleMarkerClick(singlePost.id, singlePost.latitude,singlePost.longitude)}
                            />

                        </Marker>

                        {singlePost.id === currentPlaceId && (

                            <Popup longitude={singlePost.longitude} latitude={singlePost.latitude}
                                   anchor="bottom"
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
