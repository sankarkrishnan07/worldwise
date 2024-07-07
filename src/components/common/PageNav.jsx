import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.scss";

export default function PageNav() {
  return (
    <nav className={styles.pageNav}>
      <Logo />
      <ul className={styles.pageNavList}>
        <li className={styles.pageNavItem}>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li className={styles.pageNavItem}>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li className={styles.pageNavItem}>
          <NavLink className="cta-link" to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}
