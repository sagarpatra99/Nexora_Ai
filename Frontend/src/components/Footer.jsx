import { Link } from 'react-router-dom';
import { Logo } from './common/Logo';

export default function Footer() {
  return (
    <footer className="border-t border-gray-300 bg-white">
      <div className="pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 px-36">
          <div className="space-y-3 flex flex-col items-start">
            <Logo />
            <p className="text-sm text-gray-500">
              AI-powered e-commerce platform with smart recommendations and price forecasting.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-medium">
              <li><Link to="/products" className="hover:text-gray-700 transition-colors">All Products</Link></li>
              <li><Link to="/categories" className="hover:text-gray-700 transition-colors">Categories</Link></li>
              <li><Link to="/deals" className="hover:text-gray-700 transition-colors">Deals</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Account</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-medium">
              <li><Link to="/profile" className="hover:text-gray-700 transition-colors">My Profile</Link></li>
              <li><Link to="/orders" className="hover:text-gray-700 transition-colors">Orders</Link></li>
              <li><Link to="/cart" className="hover:text-gray-700 transition-colors">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Sell on Nexora</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-medium">
              <li><Link to="/signup" className="hover:text-gray-700 transition-colors">Become a Seller</Link></li>
              <li><Link to="/seller" className="hover:text-gray-700 transition-colors">Seller Dashboard</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-8 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Nexora.ai — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
