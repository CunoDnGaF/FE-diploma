const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    let cart = store.getState().cart;
    localStorage.setItem('cart', JSON.stringify(cart.items));
    return result;
  };


export default localStorageMiddleware;