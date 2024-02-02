import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import Container from "react-bootstrap/Container";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const apiKey = "AIzaSyD_wkpI6bjBWcIW3CJbEf7eEN7y_eKJFDQ";

const LocationPicker = ({
  lat: initialLat,
  lng: initialLng,
  onLocationChange,
}) => {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: initialLat || 0,
    lng: initialLng || 0,
  });

  const [mapCenter, setMapCenter] = useState({
    lat: initialLat || 0,
    lng: initialLng || 0,
  });

  useEffect(() => {
    // Set the initial map center
    setMapCenter({
      lat: initialLat || 0,
      lng: initialLng || 0,
    });
  }, [initialLat, initialLng]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  const handleMapClick = (event) => {
    // Update the selected location and map center
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    setMapCenter({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });

    onLocationChange({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleMarkerDragEnd = (event) => {
    // Update only the selected location
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });

    onLocationChange({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div
      style={{
        height: "500px",
        width: "910px",
        border: "0.5px solid #2F80ED",
        borderRadius: "8px",
        backgroundColor: "#f1f3f4",
      }}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={mapCenter}
        onClick={handleMapClick}
      >
        <MarkerF
          position={selectedLocation}
          draggable={true}
          onDragEnd={handleMarkerDragEnd}
        />
      </GoogleMap>
    </div>
  );
};

export default LocationPicker;
