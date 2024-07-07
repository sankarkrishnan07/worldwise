import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import styles from "./Map.module.scss";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "./common/Button";
import { useGeolocation } from "../hooks/useGeoLocation";
import useURLPosition from "../hooks/useURLPosition";

export default function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const {
    isLoading: isPositionLoading,
    position,
    getPosition,
  } = useGeolocation();

  const [lat, lng] = useURLPosition();

  useEffect(
    function () {
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng]
  );

  useEffect(
    function () {
      if (position) setMapPosition([position.lat, position.lng]);
    },
    [position]
  );

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              {city.emoji} {city.cityName}
            </Popup>
          </Marker>
        ))}
        <CenterMap position={mapPosition} />
        <OnMapClick />
      </MapContainer>
      <Button type="location" onClick={getPosition}>
        {isPositionLoading ? "Loading" : "Use your location"}
      </Button>
    </div>
  );
}

function CenterMap({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function OnMapClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

CenterMap.propTypes = {
  position: PropTypes.array,
};
