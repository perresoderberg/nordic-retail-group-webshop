import { Link } from "react-router-dom";

import shoppingImage from "../assets/images/not-found/not-found-shopping1.webp";
import styles from "./NotFoundPage.module.css";


export default function NotFoundPage() {
    return (
        <section className={styles.notFound}>
            <div className={styles.content}>
                {/* Visar felkoden tydligt */}
                <p className={styles.errorCode} aria-hidden="true">
                    404
                </p>

                {/* Sidans huvudinnehåll */}
                <div className={styles.message}>
                    {/* Dekorativ shoppingillustration */}
                    <img
                        className={styles.shoppingImage}
                        src={shoppingImage}
                        alt=""
                        aria-hidden="true"
                    />

                    <h1>Oops!</h1>

                    <p>
                        Sidan du letar efter verkar ha försvunnit ur sortimentet.
                    </p>

                    <p>Som tur är finns det mycket mer att upptäcka.</p>

                    {/* Länkar tillbaka till webbshoppen */}
                    <div className={styles.actions}>
                        <Link to="/" className={styles.primaryButton}>
                            Till startsidan
                        </Link>

                        <Link to="/products" className={styles.secondaryButton}>
                            Utforska produkter
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}