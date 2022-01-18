import React, { useEffect } from "react";
import classes from "./Map.module.scss";
import { useRef } from "react";

type LatLng = { lat: number; lng: number };
let map: google.maps.Map;

const Map: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  center: LatLng;
  zoom: number;
}> = (props) => {
  const mapRef = useRef(null);

  useEffect(() => {
    map = new window.google.maps.Map(mapRef.current!, {
      center: props.center,
      zoom: props.zoom,
    });

    new window.google.maps.Marker({ position: props.center, map: map });
  }, [props.center, props.zoom]);

  return (
    <div
      className={`${classes.map} ${props.className}`}
      style={props.style}
      ref={mapRef}
    ></div>
  );
};
export default Map;
