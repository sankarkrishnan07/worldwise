import { useEffect } from "react";
import { useCities } from "../contexts/CitiesContext";
import styles from "./City.module.scss";
import BackButton from "./common/BackButton";
import { useParams } from "react-router-dom";

export default function City() {
  const { id } = useParams();

  const { isLoading, curCity, getCity } = useCities();

  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );

  const { cityName: name, date, notes } = curCity;

  return isLoading ? (
    "loading..."
  ) : (
    <div className={styles.city}>
      <div className={styles.cityInfoWrap}>
        <h3 className={styles.cityInfoLabel}>city name</h3>
        <p className={styles.cityInfo}>{name}</p>
      </div>
      <div className={styles.cityInfoWrap}>
        <h3 className={styles.cityInfoLabel}>you went to {name} on</h3>
        <p className={styles.cityDate}>{new Date(date).toDateString()}</p>
      </div>
      {curCity.notes && (
        <div className={styles.cityInfoWrap}>
          <h3 className={styles.cityInfoLabel}>Your Notes</h3>
          <p className={styles.cityNotes}>{notes}</p>
        </div>
      )}
      <div className={styles.cityInfoWrap}>
        <h3 className={styles.cityInfoLabel}>learn more</h3>
        <a
          href={`https://en.wikipedia.org/wiki/${name}`}
          target="_blank"
          rel="noreferrer"
          className={styles.cityLearnMore}
        >
          Checkout {name} on Wiki...&rarr;
        </a>
      </div>
      <BackButton>back</BackButton>
    </div>
  );
}
