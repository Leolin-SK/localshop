import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-slate-50 min-h-[calc(100vh-56px)]">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Votre panier</h1>
          <p className="text-slate-500 mb-6">Votre panier est vide pour le moment.</p>
          <Link
            to="/"
            className="inline-flex bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Continuer mes achats
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-56px)]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Votre panier</h1>
            <p className="text-sm text-slate-500 mt-1">
              {cart.length} article{cart.length > 1 ? 's' : ''} dans votre panier
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Vider le panier
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Liste des articles */}
          <div className="lg:col-span-2 space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 p-4 flex gap-4 items-center"
              >
                <div className="w-16 h-16 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-slate-400 text-xs">Img</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 truncate">{item.name}</p>
                  <p className="text-green-700 font-medium text-sm mt-0.5">
                    {Number(item.price).toLocaleString()} XFA
                  </p>
                  <span className="inline-block mt-1 text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                    En stock
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-medium text-slate-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                  >
                    +
                  </button>
                </div>

                <div className="text-right shrink-0 w-24">
                  <p className="font-semibold text-slate-800">
                    {(Number(item.price) * item.quantity).toLocaleString()} XFA
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-red-500 hover:text-red-600 mt-1"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}

            <Link to="/" className="inline-flex text-sm text-slate-500 hover:text-green-700 mt-2">
              Continuer mes achats
            </Link>
          </div>

          {/* Récapitulatif */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 h-fit sticky top-20">
            <h2 className="font-bold text-slate-800 mb-4">Récapitulatif</h2>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-slate-600">
                <span>Sous-total ({cart.length} article{cart.length > 1 ? 's' : ''})</span>
                <span>{total.toLocaleString()} XFA</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Livraison</span>
                <span className="text-green-600 font-medium">À définir</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 mb-5">
              <div className="flex justify-between font-bold text-slate-800 text-lg">
                <span>Total</span>
                <span className="text-green-700">{total.toLocaleString()} XFA</span>
              </div>
            </div>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition">
              Passer la commande
            </button>

            <p className="text-xs text-center text-slate-400 mt-3">
              Paiement sécurisé · Service client disponible
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;