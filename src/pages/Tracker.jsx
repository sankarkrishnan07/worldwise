import { Outlet } from "react-router-dom";
import Trackernav from "../components/TrackerNav";
import Copyright from "../components/common/Copyright";
import Logo from "../components/common/Logo";
import styles from "./Tracker.module.scss";
import Logout from "../components/Logout";
import Map from "../components/Map";

export default function Tracker() {
  // const { id } = useParams();

  return (
    <div className={styles.trackerWrap}>
      <div className={styles.tracker}>
        <Logo />
        <div className={styles.trackerDetails}>
          <Trackernav />
          <Outlet />
        </div>
        <Copyright />
      </div>
      {/* <div className={styles.trackerMap} onClick={() => navigate("form")}> */}
      <Map />
      {/* </div> */}
      <Logout />
    </div>
  );
}
