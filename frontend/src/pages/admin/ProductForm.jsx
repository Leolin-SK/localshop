import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    is_visible: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !user.is_admin) {
      navigate('/login');
      return;
    }

    if (isEdit) {
      api.getAdminProducts()
        .then((products) => {
          const product = products.find((p) => p.id === Number(id));
          if (product) {
            setForm({
              name: product.name,
              description: product.description || '',
              price: product.price,
              stock: product.stock,
              is_visible: product.is_visible,
            });
          }
        })
        .catch(() => setError('Produit introuvable'));
    }
  }, [user, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    try {
      if (isEdit) {
        await api.updateProduct(id, data);
      } else {
        await api.createProduct(data);
      }
      navigate('/admin/products');
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'enregistrement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-56px)]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-sm text-slate-500 mb-5">
          <Link to="/admin/products" className="hover:text-green-700">Admin</Link>
          <span className="mx-2">/</span>
          <Link to="/admin/products" className="hover:text-green-700">Produits</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800">{isEdit ? 'Modifier' : 'Ajouter'}</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <h1 className="text-xl font-bold text-slate-800 mb-6">
            {isEdit ? 'Modifier le produit' : 'Ajouter un produit'}
          </h1>

          {error && (
            <div className="mb-5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Nom *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ex : Casque Bluetooth"
                required
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Décrivez brièvement le produit..."
                rows="4"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 resize-y"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Prix (XFA) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="25000"
                  required
                  min="0"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Stock *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="10"
                  required
                  min="0"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>

            <label className="flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                name="is_visible"
                checked={form.is_visible}
                onChange={handleChange}
                className="w-4 h-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
              />
              Produit visible sur la boutique
            </label>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Link
                to="/admin/products"
                className="px-4 py-2.5 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
              >
                Annuler
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition disabled:opacity-60"
              >
                {loading ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;