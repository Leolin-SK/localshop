import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="font-bold text-lg text-slate-800">
            Local<span className="text-green-600">Shop</span>
          </span>
        </Link>

        <nav className="flex items-center gap-5 text-sm text-slate-600">
          <Link to="/" className="hover:text-green-700 font-medium">Boutique</Link>
          <Link to="/cart" className="hover:text-green-700 font-medium relative">
            Panier
            {cartCount > 0 && (
              <span className="ml-1 bg-green-600 text-white text-xs rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              {user.is_admin && (
                <Link to="/admin/products" className="hover:text-green-700 font-medium">
                  Admin
                </Link>
              )}
              <span className="text-slate-400 text-xs hidden sm:inline">{user.name}</span>
              <button
                onClick={logout}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-green-600 hover:bg-green-700 text-white px-3.5 py-1.5 rounded-lg font-medium transition"
            >
              Connexion
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;