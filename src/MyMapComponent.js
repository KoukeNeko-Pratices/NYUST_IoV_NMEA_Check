import React, {useRef} from "react";
import {useEffect} from "react";

export function MyMapComponent({center, zoom,}: {
    center: google.maps.LatLngLiteral;
    zoom: number;
}) {
    const ref = useRef();

    useEffect(() => {
        new window.google.maps.Map(ref.current, {
            center,
            zoom,
        });
    });

    return <div ref={ref} id="map" style={{height: "100VH", width: "100VW"}}/>;
}