import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Logout.module.scss";
import Button from "./common/Button";

export default function Logout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout(){
    logout();
    navigate("/login")
  }

  return (
    <div className={styles.logout}>
      <div className={styles["logout-profile"]}>
        <img src="/img-2.jpg" alt="profile" />
      </div>
      <p className={styles["logout-message"]}>Welcome, {user.name}</p>
      <Button type="logout" onClick={handleLogout}>
        logout
      </Button>
    </div>
  );
}
