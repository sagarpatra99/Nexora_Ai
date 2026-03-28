import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productAPI } from "../app/api";
import { useCart } from "../contexts/CartContext";
import ProductCard from "../components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
    fetchRecommendations();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await productAPI.getProduct(id);
      setProduct(res.data.product);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const res = await productAPI.getRecommendations(id);
      setRecommendations(res.data.recommendedProducts);
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product._id);
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.image || "/placeholder.jpg"} alt={product.title} className="w-full h-96 object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-4">${product.price}</p>
          <p className="mb-4">Category: {product.category}</p>
          <p className="mb-4">Brand: {product.brand}</p>
          <p className="mb-4">Stock: {product.stock}</p>
          <button onClick={handleAddToCart} className="bg-green-500 text-white px-6 py-3 rounded">
            Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendations.map((rec) => (
            <ProductCard key={rec._id} product={rec} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;