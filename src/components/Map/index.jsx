import React from "react";
import L from "leaflet";
import { MapContainer, Marker, Tooltip, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "../../assets/marker-icon.png";
import markerShadow from "../../assets/marker-shadow.png";

const icon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Map = ({ orders, client }) => {
  return (
    <MapContainer
      center={[43.238949, 76.889709]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <TileLayer
        attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/hooizit/cl5odzee800fa14rzv0ajktja/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaG9vaXppdCIsImEiOiJjbDVsYnp5cTEwaWNlM3BwYWE5aG42ZDI3In0.z0dvd5BvF_4JxH02niDg8Q`}
      />
      {orders.map((item) => {
        const { lat, long } = item.coords;
        return (
          <Marker key={item.id} position={[lat, long]} icon={icon}>
            <Tooltip>
              <div className="tooltip--header">
                <span>#{item.id}</span>
                <b>{item.price} ₸</b>
              </div>
              <h4>{client(item.client_id).name}</h4>
            </Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
