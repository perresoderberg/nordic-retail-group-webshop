import { useState } from "react";
import { signIn } from "../../services/auth";
import styles from "./LoginForm.module.css";


export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Hanterar inloggningen när formuläret skickas
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setErrorMessage("");
        setIsLoading(true);

        try {
            await signIn(email, password);
        } catch {
            setErrorMessage("Fel e-postadress eller lösenord.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label htmlFor="email">E-postadress</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="password">Lösenord</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
            </div>

            {errorMessage && (
                <p className={styles.errorMessage} role="alert">
                    {errorMessage}
                </p>
            )}

            <button className={styles.submitButton}
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? "Loggar in..." : "Logga in"}
            </button>
        </form>
    );
}