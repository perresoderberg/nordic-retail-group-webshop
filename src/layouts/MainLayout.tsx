import { Outlet } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import AddedToCartModal from "../cart/components/AddedToCartModal";
import ScrollToTop from "../components/ScrollToTop";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Flyttar sidan högst upp vid byte av sida */}
      <ScrollToTop />

      {/* Hoppa direkt till sidans huvudinnehåll med tangentbord */}
      <a className="skip-link" href="#main-content">
        Hoppa till huvudinnehåll
      </a>

      <Header />

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <AddedToCartModal />
    </div>
  );
}