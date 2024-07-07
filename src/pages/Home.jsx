import PageNav from "../components/common/PageNav";

import styles from "./Home.module.scss";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className={styles.home}>
      <PageNav />
      <section className={styles.homeContent}>
        <h1 className={styles.homeTitle}>
          You travel the world. <br />
          WorldWise keeps track of your adventures.
        </h1>
        <p className={styles.homePara}>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </p>
        <Link to="/login" className="cta-link">Start tracking now!</Link>
      </section>
    </div>
  );
}
