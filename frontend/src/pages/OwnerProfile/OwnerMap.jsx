import React, { useState, useEffect } from "react";
import mapStyles from "./MapStyle";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

import Container from "react-bootstrap/Container";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
};

function NstayMap({ lat, lng }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD_wkpI6bjBWcIW3CJbEf7eEN7y_eKJFDQ",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <Container
      style={{
        height: "300px",
        width: "550px",
        border: "0.5px solid #2F80ED",
        borderRadius: "6px",
        marginTop: "20px",
      }}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={{ lat, lng }}
        options={options}
      >
        <MarkerF
          position={{ lat, lng }}
        />
      </GoogleMap>
    </Container>
  );
}

export default NstayMap;
