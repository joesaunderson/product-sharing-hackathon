import { OrderItem } from '../types';

interface OrderSummaryProps {
  items: OrderItem[];
  total: number;
}

const OrderSummary = ({ items, total }: OrderSummaryProps) => {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 9.99 : 0;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 lg:sticky lg:top-6">
      <h2 className="text-2xl font-bold text-black mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {items.map((item, index) => (
          <div key={item.product.id || index} className="flex justify-between items-start py-3 border-b border-gray-200">
            <div className="flex-1">
              <p className="font-semibold text-black">{item.product.name}</p>
              <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold text-black">
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-3 border-t border-gray-300 pt-4">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-xl font-bold text-black border-t border-gray-300 pt-3">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button className="w-full bg-black text-white font-bold py-4 px-6 rounded-lg mt-6 hover:bg-gray-800 transition-colors">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
