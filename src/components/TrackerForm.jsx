import styles from "./TrackerForm.module.scss";
import Button from "./common/Button";
import { useEffect, useState } from "react";
import BackButton from "./common/BackButton";
import useURLPosition from "../hooks/useURLPosition";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?";

export default function TrackerForm() {
  const navigate = useNavigate();
  const {isLoading} = useCities();

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [travelDate, setTravelDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [travelNotes, setTravelNotes] = useState("");

  const {createCity} = useCities();

  const [isdataLoading, setIsDataLoading] = useState(false);
  const [lat, lng] = useURLPosition();
  const [isdataError, setIsdataError] = useState("");

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function getCityData() {
        try {
          setIsDataLoading(true);
          setIsdataError("");
          const res = await fetch(`${BASE_URL}latitude=${lat}&longitude=${lng}`);
          const data = await res.json();

          if (!data.countryCode)
            throw new Error(
              "This doesnt seem to be a city. Click somewhere else!"
            );

          setCity(data.city || data.locality);
          setCountry(data.countryName);
        } catch (err) {
          setIsdataError(err.message);
        } finally {
          setIsDataLoading(false);
        }
      }

      getCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(){
    const newCity = {
      cityName: city,
      country,
      date: travelDate,
      notes: travelNotes,
      position : {lat, lng}
    }

    await createCity(newCity)
    navigate("/tracker/cities")
  }

  if(!lat && !lng) return <p>Start by clicking anywhere in the map!</p>
  if (isdataLoading) return <p>Loading...</p>;
  if (isdataError) return <p>{isdataError}</p>;

  return (
    <form className={`${styles.trackerForm} ${isLoading ? styles.loading : ""}`} autoComplete="on">
      <div className={styles["trackerForm__input-wrap"]}>
        <label htmlFor="city" className={styles["trackerForm__input-label"]}>
          City Name
        </label>
        <input
          type="text"
          name="city"
          id="city"
          className={styles["trackerForm__input-text"]}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className={styles["trackerForm__input-wrap"]}>
        <label htmlFor="date" className={styles["trackerForm__input-label"]}>
          When did you go to {city}?
        </label>
        <input
          type="date"
          name="date"
          id="date"
          className={styles["trackerForm__input-text"]}
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
        />
      </div>
      <div className={styles["trackerForm__input-wrap"]}>
        <label htmlFor="note" className={styles["trackerForm__input-label"]}>
          Notes about your trip to {city}
        </label>
        <textarea
          name="note"
          id="note"
          className={styles["trackerForm__input-textArea"]}
          value={travelNotes}
          onChange={(e) => setTravelNotes(e.target.value)}
        />
      </div>
      <div className={styles["trackerForm__btn-wrap"]}>
        <Button onClick={handleSubmit}>Add</Button>
        <BackButton>Back</BackButton>
      </div>
    </form>
  );
}
