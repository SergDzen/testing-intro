function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
  
  if (quantity <= 0) {
    throw new RangeError('Количество должно быть положительным числом.');
  }

  const existingItem = cart.find(item => item.id === product.id);
  const existingQuantity = existingItem ? existingItem.quantity : 0;
  const totalQuantity = existingQuantity + quantity;

  if (totalQuantity > product.stock) {
    throw new RangeError('Нельзя добавить в корзину больше товара, чем есть на складе.');
  }
  
  if (existingItem) {
    return cart.map(item => item.id === product.id ? { ...item, quantity: totalQuantity } : item);
  }
  return [...cart, { ...product, quantity }];
}
function changeQuantity() { return notImplemented(); }
function removeFromCart() { return notImplemented(); }
function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
