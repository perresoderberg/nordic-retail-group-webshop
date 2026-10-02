import { useAuth } from "../auth/useAuth";
import LogoutButton from "../auth/LogoutButton";
import LoginForm from "../auth/LoginForm";
import styles from "./login.module.css";

export default function Login() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const isLoggedIn = user !== null;

  return (
    <div id="main-content" className={styles.loginPage}>
      <section className={styles.loginCard} aria-labelledby="login-heading">
        <div className={styles.loginHeader}>
          <h1 id="login-heading">
            {isLoggedIn ? "Du är inloggad" : "Logga in"}
          </h1>

          <p>
            {isLoggedIn
              ? "Du är nu inloggad på ditt konto."
              : "Logga in med din e-postadress och ditt lösenord."}
          </p>
        </div>

        {user ? <LogoutButton /> : <LoginForm />}
      </section>
    </div>
  );
}
