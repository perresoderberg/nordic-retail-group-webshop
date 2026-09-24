import { Link } from "react-router-dom";

import logo from "../../assets/icons/logo_black.svg";
import person from "../../assets/icons/person_black.svg";
import basket from "../../assets/icons/basket_black.svg";

export default function Navigation() {
  return (
    <nav className="mx-auto flex w-[90%] max-w-7xl items-center justify-between py-4">
      <div className="flex items-center gap-8">
        <Link to="/" aria-label="Home">
          <img className="h-10 w-auto" src={logo} alt="Nordic Retail Group" />
        </Link>

        <Link
          to="/products?category=electronics"
          className="text-sm text-white hover:text-gray-300"
        >
          Electronics
        </Link>

        <Link
          to="/products?category=clothing"
          className="text-sm text-white hover:text-gray-300"
        >
          Clothing
        </Link>
      </div>

      <div className="flex items-center gap-5">
        <Link to="/login" aria-label="Log in">
          <img className="h-8 w-8" src={person} alt="Login" />
        </Link>

        <Link to="/basket" aria-label="Shopping cart">
          <img className="h-8 w-8" src={basket} alt="Shopping cart" />
        </Link>
      </div>
    </nav>
  );
}
