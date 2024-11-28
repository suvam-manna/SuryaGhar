import React, { useRef, useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, useMap, FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import leafletImage from "leaflet-image";
import dataContext from "../contexts/dataContext.js";

// Helper function to calculate rectangle area
const calculateRectangleArea = (bounds) => {
  const earthRadius = 6378137; // Earth's radius in meters

  const lat1 = bounds.getSouth();
  const lat2 = bounds.getNorth();
  const lng1 = bounds.getWest();
  const lng2 = bounds.getEast();

  const width =
    earthRadius *
    ((lng2 - lng1) * (Math.PI / 180)) *
    Math.cos(((lat1 + lat2) / 2) * (Math.PI / 180));
  const height = earthRadius * ((lat2 - lat1) * (Math.PI / 180));

  const area = Math.abs(width * height); // Area in square meters
  return area;
};

const LocationMarker = () => {
  const map = useMap();

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 32 });

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
  const { data, setData } = useContext(dataContext);  
  const navigate = useNavigate();

  const handleCreated = (e) => {
    const layer = e.layer;
    if (layer instanceof L.Rectangle) {
      const bounds = layer.getBounds();
      const area = calculateRectangleArea(bounds);
      console.log("Rectangle created with bounds:", bounds);
      console.log("Calculated area (in square meters):", area.toFixed(2));
      let topLeft = bounds.getNorthWest();
      console.log("topleft", topLeft.x);
      // Capture the map image inside the drawn rectangle
      leafletImage(mapRef.current, (err, canvas) => {
        if (err) {
          console.error("Error generating image:", err);
          return;
        }

        const croppedCanvas = document.createElement("canvas");
        const ctx = croppedCanvas.getContext("2d");

        const earthRadius = 6378137; // Earth's radius in meters

        const lat1 = bounds.getSouth();
        const lat2 = bounds.getNorth();
        const lng1 = bounds.getWest();
        const lng2 = bounds.getEast();

        // Convert geographical bounds to pixel coordinates
        const topLeft = mapRef.current.latLngToContainerPoint(
          bounds.getNorthWest()
        );
        const bottomRight = mapRef.current.latLngToContainerPoint(
          bounds.getSouthEast()
        );

        const width = bottomRight.x - topLeft.x;
        const height = bottomRight.y - topLeft.y;

        croppedCanvas.width = width;
        croppedCanvas.height = height;

        // Draw the selected area on the cropped canvas
        ctx.drawImage(
          canvas, // Source canvas
          topLeft.x, // Source x (start)
          topLeft.y, // Source y (start)
          width, // Source width
          height, // Source height
          0, // Destination x (start)
          0, // Destination y (start)
          width, // Destination width
          height // Destination height
        );
        // Convert canvas to base64 image
        const imageData = croppedCanvas.toDataURL("image/png");

        // Save the image URL in the state to pass it to the child component
        setImageUrl(imageData);
        console.log("imageURL: ", imageData);

        var img = document.createElement("img");
        img.width = width;
        img.height = height;
        img.crossOrigin = "anonymous";
        img.src = imageData;
        document.body.appendChild(img);

        croppedCanvas.toBlob(function (blob) {
          // Create a File object from the Blob
          const file = new File([blob], "clippedImage.png", {
            type: "image/png",
          });
          console.log(file);

          const formData = new FormData();
          formData.append("image", file);

          formData.append("long", bounds.getWest());
          formData.append("lat", bounds.getSouth());

          formData.append("area", area);

          fetch("http://127.0.0.1:5000/upload", {
            method: "POST",
            body: formData,
          })
            .then((res) => {
              return res.json();
            })
            .then((data2) => {
              console.log("Power calculated", data2);
              
              setData({ image: imageData, roofTopArea: data2.roofTopArea, power: data2.power });
              console.log("Data", data);
              
              navigate("/estimate");
            })
            .catch((err) => {
              console.log(err);
            });
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
    </div>
  );
};

export default Map;
