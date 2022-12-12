import React from "react";
import './App.css';
import {MyMapComponent} from "./MyMapComponent";
import {ReactElement} from "react";
import {Wrapper, Status} from "@googlemaps/react-wrapper";
import {Marker} from "./Marker";
import {Map} from "./Map";
import {IconButton} from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {Here} from "./Here";

const render = (status): ReactElement => {
    if (status === Status.FAILURE) return <div>Fail</div>;
    return <div>{status}</div>;
};

function App() {
    const zoom = 10;

    const [center, setCenter] = React.useState({lat: 0, lng: 0});
    const [here, setHere] = React.useState({lat: 0, lng: 0});
    const getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    console.log(position.coords);
                    setHere({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                    setCenter({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                }
            )
        } else {
            // error => console.log(error)
        }
    }
    setTimeout(() => {
        getGeoLocation()
    }, 1000)

    let doConvert = (inputFile) => {
        // prepare a list to store the data and save to the file
        const data = [];
        // const fs = require('fs');
        let result = ""
        // fs.writeFileSync('log_output.txt', '');
        // const inputFile = fs.readFileSync('_log.txt', 'utf-8');
        const inputLines = inputFile.split('\n');

        for (const line of inputLines) {
            const lineData = line.split('] ')[1];
            const data = lineData.split(',');

            if (data[0] === '$GNGGA') {
                // Extract latitude and longitude from the data
                let latitude = data[2];
                let longitude = data[4];

                if (data[3] === 'S') {
                    latitude = (parseInt(latitude) * -1).toString();
                }
                if (data[5] === 'W') {
                    longitude = (parseInt(longitude) * -1).toString();
                }

                latitude = latitude.slice(0, 2) + '.' + Math.round((parseInt(latitude.slice(2).replace('.', '')) / 60)).toString();
                longitude = longitude.slice(0, 3) + '.' + Math.round((parseInt(longitude.slice(3).replace('.', '')) / 60)).toString();

                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

                // append the data to the list
                const temp = latitude + ',' + longitude;
                console.log(temp);
                data.push(temp);
                result += temp + '\n';
            }
        }
        return result
    }

    const [marker, setMarker] = React.useState([]);
    return (<>
            <Wrapper apiKey="AIzaSyCLdqEyGV0LvA9pOb7Adx6Fm40yqJS9GrU" render={render}>
                {/*<MyMapComponent center={center} zoom={zoom}>*/}
                {/*    <Marker position={center} />*/}
                {/*</MyMapComponent>        */}
                <Map center={center} zoom={zoom} style={{height: "100VH", width: "100VW"}}>
                    {marker.map((m, k) => {
                        return <Marker key={k} position={m}/>
                    })}
                    <Here position={{lat: here.lat, lng: here.lng}}/>
                </Map>
            </Wrapper>
            <IconButton color="primary" component="label" size={"large"}
                        style={{position: "fixed", left: 20, bottom: 20, background: "white"}}>
                <input hidden accept="text/*" type="file" onChange={(e) => {
                    let file = e.target.files[0];

                    let reader = new FileReader();

                    // Closure to capture the file information.
                    reader.onload = (function (theFile) {
                        return function (e) {
                            let results = doConvert(e.target.result).replace("\r", "").split("\n")
                            // console.log(results)
                            let markers = []
                            results.map((v) => {
                                let loc = v.split(",")
                                markers.push({lat: Number(loc[0]), lng: Number(loc[1])})
                            })
                            setMarker(markers);
                            console.log(markers)
                        };
                    })(file);

                    // Read in the image file as a data URL.
                    reader.readAsText(file);

                    // console.log(file)

                }}/>
                <FileUploadIcon/>
            </IconButton>
        </>
    );
}

export default App;
