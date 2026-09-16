import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div style={styles.card}>
      <div style={styles.imagePlaceholder}>
        {product.image ? (
          <img src={product.image} alt={product.name} style={styles.image} />
        ) : (
          <span style={{ color: '#94a3b8' }}>Pas d'image</span>
        )}
      </div>

      <div style={styles.body}>
        <h3 style={styles.title}>
          <Link to={`/products/${product.id}`} style={styles.titleLink}>
            {product.name}
          </Link>
        </h3>
        <p style={styles.price}>{Number(product.price).toLocaleString()} XFA</p>
        <button onClick={() => addToCart(product)} style={styles.button}>
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  imagePlaceholder: {
    height: '160px',
    backgroundColor: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  body: {
    padding: '12px',
  },
  title: {
    margin: '0 0 8px',
    fontSize: '16px',
  },
  titleLink: {
    color: '#1e293b',
    textDecoration: 'none',
  },
  price: {
    margin: '0 0 12px',
    fontWeight: 'bold',
    color: '#0f766e',
  },
  button: {
    width: '100%',
    padding: '8px',
    backgroundColor: '#0d9488',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ProductCard;