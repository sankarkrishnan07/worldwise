import { useNavigate } from "react-router-dom";
import PageNav from "../components/common/PageNav";
import styles from "./Login.module.scss";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [mail, setMail] = useState("sk");
  const [passcode, setPasscode] = useState("sk");
  const navigate = useNavigate();

  const {login, isAuthorized} = useAuth();

  useEffect(() => {
    if (isAuthorized) navigate("/tracker");
  }, [isAuthorized, navigate]);

  function handleLogin() {
    if(mail, passcode) login(mail, passcode);
  }

  return (
    <div className={styles.login}>
      <PageNav />
      <form className={styles.loginForm}>
        <div className={styles.loginFormInput}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="example@example.com"
          />
        </div>
        <div className={styles.loginFormInput}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="........"
          />
        </div>
        <a href="#" className="cta-link" onClick={handleLogin}>
          Login
        </a>
      </form>
    </div>
  );
}
