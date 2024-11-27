import React, { useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import leafletImage from "leaflet-image";
import ImageDisplay from './ImageDisplay';  // Import the ImageDisplay component
import dataContext from '../contexts/dataContext.js'

// Helper function to calculate rectangle area
const calculateRectangleArea = (bounds) => {
    const earthRadius = 6378137; // Earth's radius in meters

    const lat1 = bounds.getSouth();
    const lat2 = bounds.getNorth();
    const lng1 = bounds.getWest();
    const lng2 = bounds.getEast();

    const width = earthRadius * ((lng2 - lng1) * (Math.PI / 180)) * Math.cos(((lat1 + lat2) / 2) * (Math.PI / 180));
    const height = earthRadius * ((lat2 - lat1) * (Math.PI / 180));

    const area = Math.abs(width * height); // Area in square meters
    return area;
};

const LocationMarker = () => {
    const map = useMap();
  
    useEffect(() => {
      map.locate({ setView: true, maxZoom: 16 });
  
      const onLocationFound = (e) => {
        L.marker(e.latlng).addTo(map).bindPopup("You are here").openPopup();
      };
  
      const onLocationError = () => {
        alert("Unable to retrieve your location");
      };
  
      map.on("locationfound", onLocationFound);
      map.on("locationerror", onLocationError);
  
      return () => {
        map.off("locationfound", onLocationFound);
        map.off("locationerror", onLocationError);
      };
    }, [map]);
  
    return null;
};

const Map = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const mapRef = useRef(null);

  const handleCreated = (e) => {
    const layer = e.layer;
    if (layer instanceof L.Rectangle) {
      const bounds = layer.getBounds();
      const area = calculateRectangleArea(bounds);
      console.log("Rectangle created with bounds:", bounds);
      console.log("Calculated area (in square meters):", area.toFixed(2));

      // Capture the map image inside the drawn rectangle
      leafletImage(mapRef.current, (err, canvas) => {
        if (err) {
          console.error("Error generating image:", err);
          return;
        }

        const croppedCanvas = document.createElement("canvas");
        const ctx = croppedCanvas.getContext("2d");
        const width = bounds.getEast() - bounds.getWest();
        const height = bounds.getNorth() - bounds.getSouth();

        croppedCanvas.width = width;
        croppedCanvas.height = height;

        // Draw the selected area on the canvas
        ctx.drawImage(
          canvas,
          bounds.getWest(),
          bounds.getSouth(),
          width,
          height,
          0,
          0,
          width,
          height
        );

        // Convert canvas to base64 image
        const imageData = croppedCanvas.toDataURL("image/png");

        // Save the image URL in the state to pass it to the child component
        setImageUrl(imageData);        

        croppedCanvas.toBlob(function (blob) {
            // Create a File object from the Blob
            const file = new File([blob], 'clippedImage.png', { type: 'image/png' });

            const formData = new FormData();
            formData.append('image', file);

            formData.append('long', bounds.getWest());
            formData.append('lat', bounds.getSouth());

            formData.append('area', area);

            fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                body: formData
            }).then(res => {
                return res.json()
            }).then(data => {
                console.log("Power calculated", data)                
            }).catch(err => {
                console.log(err)
            })

        });    
         
      });
    }
  };

  const handleDeleted = (e) => {
    console.log("Shapes deleted:", e.layers.getLayers());
  };

  return (
    <div className="h-screen w-screen">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        className="h-full w-full"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        />
        <LocationMarker />
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={handleCreated}
            onDeleted={handleDeleted}
            draw={{
              rectangle: {
                shapeOptions: {
                  color: "blue",
                  weight: 2,
                },
                showArea: false, // Disable area calculation
              },
              polyline: false,
              polygon: false,
              circle: false,
              marker: false,
              circlemarker: false,
            }}
            edit={{
              remove: true, // Allows removing existing shapes
            }}
          />
        </FeatureGroup>
      </MapContainer>

      {/* Pass the captured image to the ImageDisplay component as a prop */}
      {imageUrl && <ImageDisplay image={imageUrl} />}
    </div>
  );
};

export default Map;
