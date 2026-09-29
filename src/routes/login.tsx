import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import styles from "./login.module.css";
import LogoutButton from "../auth/LogoutButton";
import LoginForm from "../auth/LoginForm";

export default function Login() {
  // Håller reda på om användaren är inloggad
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kontrollerar och följer användarens session
  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      setIsLoggedIn(!!data.session);
    }

    checkSession();

    // Lyssnar på när användaren loggar in eller ut
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    // Avslutar/städar bort lyssnaren när komponenten tas bort
    return () => {
      subscription.unsubscribe();
    };
  }, []);
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

        {isLoggedIn ? (
          <div>
            <LogoutButton />
          </div>
        ) : (
          <LoginForm />
        )}
      </section>
    </div>
  );
}
