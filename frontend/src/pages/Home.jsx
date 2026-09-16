import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    api.getProducts()
      .then(setProducts)
      .catch((err) => setError(err.message || 'Erreur de chargement'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-56px)]">
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-2xl">
            <p className="text-green-700 text-sm font-semibold mb-3">
              Qualité · Prix accessibles · Livraison locale
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              Votre boutique en ligne locale
            </h1>            
            <p className="text-slate-600 text-base mb-6 leading-relaxed">
              Casques, claviers, souris, webcams et accessoires tech.
              Commandez simplement, recevez rapidement.
            </p>
            <a
              href="#produits"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition shadow-sm"
            >
              Voir les produits
            </a>
          </div>

          {/* Points forts */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 border border-green-100">
              <span className="text-green-700 text-lg font-bold">✓</span>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Produits de qualité</p>
                <p className="text-xs text-slate-500 mt-0.5">Sélection soignée pour le quotidien</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 border border-green-100">
              <span className="text-green-700 text-lg font-bold">✓</span>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Prix en XFA</p>
                <p className="text-xs text-slate-500 mt-0.5">Tarifs clairs, sans surprise</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 border border-green-100">
              <span className="text-green-700 text-lg font-bold">✓</span>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Service simple</p>
                <p className="text-xs text-slate-500 mt-0.5">Ajoutez au panier en un clic</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produits */}
      <section id="produits" className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Nos produits</h2>
            <p className="text-sm text-slate-500 mt-1">
              {loading ? 'Chargement...' : `${products.length} produit${products.length > 1 ? 's' : ''} disponible${products.length > 1 ? 's' : ''}`}
            </p>
          </div>
        </div>

        {loading && (
          <div className="py-16 text-center text-slate-400">Chargement des produits...</div>
        )}

        {error && (
          <div className="py-10 text-center text-red-600 bg-red-50 rounded-xl border border-red-100">
            {error}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="py-16 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
            Aucun produit pour le moment.
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition group"
              >
                <div className="relative h-44 bg-slate-100 flex items-center justify-center overflow-hidden">
                  <span className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full z-10">
                    En stock
                  </span>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-slate-400 text-sm">Pas d'image</span>
                  )}
                </div>
                <div className="p-4">
                  <Link
                    to={`/products/${product.id}`}
                    className="block font-semibold text-slate-800 group-hover:text-green-700 mb-1"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs text-slate-500 mb-3 line-clamp-2 min-h-[2rem]">
                    {product.description || 'Produit disponible en boutique'}
                  </p>
                  <p className="text-green-700 font-bold text-lg mb-3">
                    {Number(product.price).toLocaleString()} XFA
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2.5 rounded-lg transition"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bandeau bas */}
      <section className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8 grid sm:grid-cols-3 gap-6 text-center">
          <div>
            <p className="font-semibold text-slate-800 text-sm">Paiement simple</p>
            <p className="text-xs text-slate-500 mt-1">Commande claire, total en XFA</p>
          </div>
          <div>
            <p className="font-semibold text-slate-800 text-sm">Catalogue local</p>
            <p className="text-xs text-slate-500 mt-1">Produits adaptés à vos besoins</p>
          </div>
          <div>
            <p className="font-semibold text-slate-800 text-sm">Espace admin</p>
            <p className="text-xs text-slate-500 mt-1">Gestion facile des produits</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;