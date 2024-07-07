import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import styles from "./Cities.module.scss";
import PropTypes from "prop-types";
import { useCities } from "../contexts/CitiesContext";

export default function Cities() {
  const { cities, isLoading } = useCities();
  
  if(!cities) return "";

  return (
    <ul className={styles.cityList}>
      {isLoading
        ? "Loading..."
        : cities.map((city, i) => <CityItem key={i} city={city} />)}
    </ul>
  );
}

function CityItem({ city }) {
  const { deleteCity } = useCities();

  function handleClick(e) {
    e.preventDefault();
    deleteCity(city.id);
  }

  return (
    <li>
      <Link
        to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
        className={styles.cityItem}
      >
        <span className={styles.cityItemEmoji}>{city.emoji}</span>
        <h3 className={styles.cityItemName}>{city.cityName}</h3>
        <time className={styles.cityItemDate}>({city.date})</time>
        <Button type="delete" onClick={handleClick}>
          ×
        </Button>
      </Link>
    </li>
  );
}

Cities.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};

CityItem.propTypes = {
  city: PropTypes.object,
};
