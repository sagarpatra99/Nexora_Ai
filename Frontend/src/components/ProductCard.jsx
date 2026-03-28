import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product._id);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img src={product.image || "/placeholder.jpg"} alt={product.title} className="w-full h-48 object-cover mb-4" />
      <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
      <p className="text-gray-600 mb-2">${product.price}</p>
      <div className="flex justify-between">
        <Link to={`/product/${product._id}`} className="bg-blue-500 text-white px-4 py-2 rounded">
          View Details
        </Link>
        <button onClick={handleAddToCart} className="bg-green-500 text-white px-4 py-2 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;