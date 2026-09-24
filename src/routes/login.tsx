import LoginForm from "../components/auth/LoginForm";
import styles from "./login.module.css";

export default function Login() {
return (
  <main id="main-content" className={styles.loginPage}>
    <section className={styles.loginCard}
      aria-labelledby="login-heading"
    >
      <div className={styles.loginHeader}>
        <h1 id="login-heading">Logga in</h1>
        <p>Logga in med din e-postadress och ditt lösenord.</p>
      </div>

      <LoginForm />
    </section>
  </main>
);
}