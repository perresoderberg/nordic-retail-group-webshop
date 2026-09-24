import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-8 py-4 md:grid-cols-4">
        <div>
          <h2 className="mb-2 text-lg font-semibold text-white">
            Nordic Retail Group
          </h2>

          <p className="text-sm">Quality products for everyday life.</p>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-white">Shop</h2>

          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/products?category=electronics"
                className="hover:text-white"
              >
                Electronics
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=clothing"
                className="hover:text-white"
              >
                Clothing
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-white">
            Customer service
          </h2>

          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact us
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:text-white">
                Shipping
              </Link>
            </li>
            <li>
              <Link to="/returns" className="hover:text-white">
                Returns
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-white">Account</h2>

          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/login" className="hover:text-white">
                Log in
              </Link>
            </li>
            <li>
              <Link to="/basket" className="hover:text-white">
                Shopping cart
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="mx-auto flex w-[90%] max-w-7xl items-center justify-between py-5 text-xs text-gray-500">
          <span>© 2026 Nordic Retail Group</span>
        </div>
      </div>
    </footer>
  );
}
