import { useCart } from "../contexts/CartContext";

const Cart = () => {
  const { cart, updateCartItem, removeFromCart } = useCart();

  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      updateCartItem(productId, quantity);
    }
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.productId} className="flex items-center border rounded p-4">
                <img src={item.image || "/placeholder.jpg"} alt={item.title} className="w-20 h-20 object-cover mr-4" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(item.productId)}
                  className="ml-4 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-xl font-semibold">Total Items: {cart.totalItems}</p>
            <p className="text-xl font-semibold">Total Price: ${cart.totalPrice}</p>
            <button className="mt-4 bg-blue-500 text-white px-6 py-3 rounded">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;