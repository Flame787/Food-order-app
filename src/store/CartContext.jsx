import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}    // NEW dummy value
});

// useReducer needs a reducer-function, defined outside of the hook:
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    // .. update state to add a meal item
    // state.items.push(action.item)   // new item which we expect to get on this action - but not ok praxis
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    // findIndex() return 'true' (index 0, 1, 2 etc.) if item with this index was found, or 'false' (-1) if not found.
    // it compares if the id of each item is equal to the id of the item we are receiving through an action

    const updatedItems = [...state.items]; // new copy of existing item objects

    if (existingCartItemIndex > -1) {
      // if some index (0,1,2...etc.) found - this means that we already have this item in array.
      // then we just want to update the quantity-property of this item:

      // saving longer expression 'state.items[existingCartItemIndex]' into a new constant:
      const existingItem = state.items[existingCartItemIndex];

      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
        // reaching properties of the existing item and spreading them into new object 'updatedItem',
        // but then we add a 'quantity'-property to this object + add 1 to it
      };
      // overwrite the updated item under this index with new updated item, to insert it to updatedItems-array:
      updatedItems[existingCartItemIndex] = updatedItem;
      // updated state in an immutable way, without changing the existing state in memory
    } else {
      // if the item's index was not yet on the list, we add it to the newly created copy of the list:
      updatedItems.push({ ...action.item, quantity: 1 });
      // when new item is added: we are creating new object and spreading all meal data into this object,
      // but we also add a quantity-property and set it initially to 1.
    }

    return { ...state, items: updatedItems };
  }
  if (action.type === "REMOVE_ITEM") {
    // .. remove item from state

    // searching the item on the list:
    const existingCartItemIndex = state.items.findIndex(
      //   (item) => item.id === action.item.id
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items]; // new copy of existing item objects

    if (existingCartItem.quantity === 1) {
      // if there is only one item on the list, we want to remove the entire item from the cart:

      updatedItems.splice(existingCartItemIndex, 1);
      // method splice() cuts out / removes an item from array.
      // If 2nd argument = 1, it removes 1 item from this index-position.
    } else {
      // if existingCartItem.quantity is greater than just 1:
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      // fresh copy of the existing item, but we update the quantity (we deduct 1 from it)

      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  if(action.type === 'CLEAR_CART'){
    return {...state, items: []}
    // creating new state which copies/spreads the old state, but clears the items to an empty array []
  }

  return state; // 3rd option, if both if-blocks are somehow avoided - just return the state
}

// contect-wrapper around other components, to make the context available to them:
export function CartContextProvider({ children }) {
  // useReducer-hook - for a more complex state than useState:
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  });
  // arguments: 1st - reducer-function, 2nd - initial state

  function addItem(item) {
    // dispatchCartAction({ type: "ADD_ITEM", item: item})
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART"});
  }

  const cartContext = {
    items: cartState.items,
    // whenever the cartState changes, the value of items will also change, and new cartContext will be distributed to components who use it

    // adding preeviously defined functions:
    // addItem: addItem,
    // removeItem: removeItem
    // *shorter:
    addItem,
    removeItem,
    clearCart
  };

  console.log(cartContext);

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
  // ... or in React 19 and higher - enough without Provider:
  // return <CartContext></CartContext>
}

export default CartContext;
