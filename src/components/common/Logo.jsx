import { Link } from "react-router-dom";
import styles from './Logo.module.scss';

export default function Logo() {
  return (
    <div >
      <Link to="/" className={styles.logo}>
        <div className={styles.logoImg} id="logo">
          <img src="/logo.png" alt="app-logo" />
        </div>
        <h1 className={styles.logoLabel}>
          WorldWise
        </h1>
      </Link>
    </div>
  );
}
