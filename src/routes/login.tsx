import { useEffect, useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import LogoutButton from "../components/auth/LogoutButton";
import { supabase } from "../services/supabase";
import styles from "./login.module.css";
import ApiUpdateTest from "../components/test/ApiUpdateTest";


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
        <main id="main-content" className={styles.loginPage}>
            <section className={styles.loginCard}
                aria-labelledby="login-heading"
            >
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
                        <ApiUpdateTest />
                    </div>
                ) : (
                    <LoginForm />
                )}
            </section>
        </main>
    );
}