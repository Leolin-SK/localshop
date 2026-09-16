import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

function ProductList() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user || !user.is_admin) {
      navigate('/login');
      return;
    }
    loadProducts();
  }, [user]);

  const loadProducts = () => {
    setLoading(true);
    api.getAdminProducts()
      .then(setProducts)
      .catch((err) => setError(err.message || 'Erreur de chargement'))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Supprimer « ${name} » ?\nCette action est irréversible.`)) return;

    try {
      await api.deleteProduct(id);
      setMessage('Produit supprimé avec succès.');
      setTimeout(() => setMessage(''), 3000);
      loadProducts();
    } catch (err) {
      setError(err.message || 'Erreur lors de la suppression');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-400">
        Chargement...
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-56px)]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Liste des produits</h1>
            <p className="text-sm text-slate-500 mt-1">
              {products.length} produit{products.length > 1 ? 's' : ''} au total
            </p>
          </div>
          <Link
            to="/admin/products/create"
            className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition"
          >
            + Ajouter un produit
          </Link>
        </div>

        {message && (
          <div className="mb-4 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm px-4 py-3">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-slate-500 border-b border-slate-200">
                  <th className="px-4 py-3 font-semibold">Produit</th>
                  <th className="px-4 py-3 font-semibold">Prix</th>
                  <th className="px-4 py-3 font-semibold">Stock</th>
                  <th className="px-4 py-3 font-semibold">Visible</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-slate-800">{product.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5 max-w-xs truncate">
                        {product.description || '—'}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-slate-700 font-medium whitespace-nowrap">
                      {Number(product.price).toLocaleString()} XFA
                    </td>
                    <td className="px-4 py-3.5 text-slate-700">{product.stock}</td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full ${
                          product.is_visible
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {product.is_visible ? 'Oui' : 'Non'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/products/${product.id}`}
                          className="text-xs font-medium text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
                        >
                          Voir
                        </Link>
                        <Link
                          to={`/admin/products/${product.id}/edit`}
                          className="text-xs font-medium text-blue-700 hover:text-blue-800 px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100"
                        >
                          Modifier
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="text-xs font-medium text-red-700 hover:text-red-800 px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length === 0 && (
            <div className="px-4 py-12 text-center text-slate-400">
              Aucun produit. Commencez par en ajouter un.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;