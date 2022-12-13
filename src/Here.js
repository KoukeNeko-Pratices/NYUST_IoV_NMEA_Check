import React from "react";

export function Here(options) {
    const [marker, setMarker] = React.useState();

    const svgMarker = {
        path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
        fillColor: "blue",
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 2,
        anchor: new window.google.maps.Point(15, 30),
    };

    // const svgMarker = {
    //     path: "M22.5 36.9a5 5 0 1 0 10 0a5 5 0 1 0 -10 0",
    //     fillColor: "white",
    //     fillOpacity: 0.6,
    //     strokeColor: "blue",
    //     strokeWeight: 2,
    //     rotation: 0,
    //     scale: 1,
    //     anchor: new window.google.maps.Point(0, 0),
    // };

    React.useEffect(() => {
        if (!marker) {
            setMarker(new window.google.maps.Marker({
                icon: svgMarker,
            }));
        }

        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);
    React.useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);
    return null;
}