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

  function handleGoToCheckout() {
    userProgressCtx.showCheckout(); // sets userProgress to 'checkout' and no longer 'cart'
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
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
        {/* {cartCtx.items.length > 0 ? (<Button onClick={handleCloseCart}>Go to Checkout</Button>) : null} */}
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        )}
        {/* if number of items is > 0, show the Button to proceed to Checkout, otherwise (if cart is empty) not showing it */}
        {/* when 2nd button is clicked (if there are items in cart), the existing, first Modal will close,
      and another Modal - Checkout will open instead */}
      </p>
    </Modal>
  );
}
