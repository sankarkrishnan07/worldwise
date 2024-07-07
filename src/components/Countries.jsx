import { useCities } from "../contexts/CitiesContext";
import styles from "./Countries.module.scss";
import PropTypes from "prop-types";

export default function Countries() {
  const { cities, isLoading } = useCities();

  return (
    <ul className={styles.countryList}>
      {isLoading
        ? "Loading..."
        : cities.map((city) => <CountryItem key={city.id} city={city} />)}
    </ul>
  );
}

function CountryItem({ city }) {
  return (
    <li className={styles.countryItem}>
      <span className={styles.countryItemEmoji}>{city.emoji}</span>
      <h3 className={styles.countryItemName}>{city.country}</h3>
    </li>
  );
}

Countries.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};

CountryItem.propTypes = {
  city: PropTypes.object,
};
