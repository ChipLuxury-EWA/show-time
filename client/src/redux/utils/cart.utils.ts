interface ICartItem {
  _id: string;
}

const updateLocalStorage = (state: any) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

const calculateItemsPrice = (cartItems: any) => {
  return Number(
    cartItems.reduce((acc: number, item: any) => acc + item.price * item.chosenTicketsAmount, 0).toFixed(2)
  );
};

const getTaxPrice = (price: number): number => {
  const taxAmount: number = 17;
  return Number(((taxAmount / 100) * price).toFixed(2));
};

export const addToCartUtil = (state: any, action: any) => {
  const item = action.payload;
  const isItemAlreadyExist = state.cartItems.find((cartItem: ICartItem) => cartItem._id === item._id);
  if (isItemAlreadyExist) {
    state.cartItems = state.cartItems.map((cartItem: ICartItem) =>
      cartItem._id === isItemAlreadyExist._id ? item : cartItem
    );
  } else {
    state.cartItems = [...state.cartItems, item];
  }
  state.itemsPrice = calculateItemsPrice(state.cartItems);
  state.shippingPrice = 10; //TODO tompo add logic to calculate shipping/ handling price
  state.taxPrice = getTaxPrice(state.itemsPrice);
  state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;

  updateLocalStorage(state);
};

export const removeFromCartUtil = (state: any, action: any) => {
  const itemId: String = action.payload;
  state.cartItems = state.cartItems.filter((item: ICartItem) => item._id !== itemId);
  updateLocalStorage(state);
};
