import { useState } from "react";
import { signOut } from "../../services/auth";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Hanterar utloggningen när användaren klickar på knappen
  async function handleLogout() {
    setErrorMessage("");
    setIsLoading(true);

    try {
      await signOut();
    } catch {
      setErrorMessage("Det gick inte att logga ut. Försök igen.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <button type="button" onClick={handleLogout} disabled={isLoading}>
        {isLoading ? "Loggar ut..." : "Logga ut"}
      </button>

      {errorMessage && <p role="alert">{errorMessage}</p>}
    </>
  );
}