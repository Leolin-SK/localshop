import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || id === 'undefined') {
      setError('Produit introuvable');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    api
      .getProduct(id)
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message || 'Produit introuvable'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-400">
        Chargement...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
        <p className="text-red-600">{error || 'Produit introuvable'}</p>
        <Link to="/" className="text-green-700 font-medium hover:underline">
          Retour a la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-56px)]">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="text-sm text-slate-500 mb-4">
          <Link to="/" className="hover:text-green-700">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800">{product.name}</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-8 grid sm:grid-cols-2 gap-8">
          <div className="bg-slate-100 rounded-xl h-64 sm:h-80 flex items-center justify-center overflow-hidden">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-slate-400">Pas d image</span>
            )}
          </div>

          <div>
            <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full mb-3">
              En stock - {product.stock} unite(s)
            </span>

            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              {product.name}
            </h1>

            <p className="text-2xl font-bold text-green-700 mb-4">
              {Number(product.price).toLocaleString()} XFA
            </p>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {product.description || 'Aucune description.'}
            </p>

            <button
              onClick={() => addToCart(product)}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;