import { NavLink } from "react-router-dom";
import styles from './TrackerNav.module.scss'

export default function Trackernav() {
  return (
    <nav className={styles.trackerNav}>
      <NavLink to="cities">cities</NavLink>
      <NavLink to="countries">countries</NavLink>
    </nav>
  );
}
