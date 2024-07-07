import PropTypes from "prop-types";
import styles from "./Button.module.scss";

export default function Button({ children, type = "", onClick }) {
  return (
    <button className={`${styles.btn} ${type}`} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  type: PropTypes.string,
  onClick: PropTypes.func,
};
