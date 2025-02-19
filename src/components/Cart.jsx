import { useContext } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import CartItem from "./CartItem.jsx";
import { currencyFormatter } from "../util/formatting.js";
import UserProgressContext from "../store/UserProgressContext";

export default function Cart() {
  const cartCtx = useContext(CartContext);

  // fetching another context:
  const userProgressCtx = useContext(UserProgressContext);

  // helper-constant to calculate total price of all items in the cart:
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  // 0 - starting value

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      {/* when progress = 'cart', we want to show the Modal */}
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          // <li key={item.id}>
          //   {item.name} - {item.quantity}
          // </li>

          // <CartItem key={item.id} {...item} />
          // we can spread the item-object onto the Cart, because item-object contains: name, quantity, price
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        <Button onClick={handleCloseCart}>Go to Checkout</Button>
      </p>
    </Modal>
  );
}
