function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {

  const existingItem = cart.find(item => item.id === product.id);
  const existingQuantity = existingItem ? existingItem.quantity : 0;
  const totalQuantity = existingQuantity + quantity;

  if (quantity <= 0) {
    throw new RangeError('Количество должно быть положительным числом.');
  }

  if (totalQuantity > product.stock) {
    throw new RangeError('Нельзя добавить в корзину больше товара, чем есть на складе.');
  }

  if (existingItem) {
    return cart.map(item => item.id === product.id ? { ...item, quantity: totalQuantity } : item);
  }
  
  return [...cart, { ...product, quantity }];
}
function changeQuantity(cart, productId, quantity) {

  const existingItem = cart.find(item => item.id === productId);
  const existingQuantity = existingItem ? existingItem.quantity : 0;
  const totalQuantity = existingQuantity + quantity;

  if (quantity === 0) {
    throw new RangeError('Количество должно быть больше 0.');
  }

  // Если товара нет в корзине, возвращаем её без изменений
  if (!existingItem) {
    return [...cart];
  }

  if (quantity > 0 && totalQuantity > existingItem.stock) {
    throw new RangeError('Нельзя добавить в корзину больше товара, чем есть на складе.');
  }
  
  return cart.map(item => item.id === productId ? { ...item, quantity: quantity } : item);
}

function removeFromCart(cart, productId) {
   return cart.filter(item => item.id !== productId); 
}

function calculateCartSubtotal(cart) {
  return cart.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promocode = '') {
  const subtotal = calculateCartSubtotal(cart);
  const delivery = subtotal >= 50000 ? 0 : 30000;

  // Промокод 10% скидка на заказ от 20 000.
  let discount = 0;
  if (promocode === 'SAVE10' && subtotal >= 20000) {
    discount = Math.round(subtotal * 0.1); 
  }

  const total = subtotal - discount + delivery;
  
  return {
    subtotal,
    discount,
    delivery,
    total,
  };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
