import { useContext } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Checkout() {
  // using context:
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  // helper-constant to calculate total price of all items in the cart:
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout(); // sets userProgressCtx to empty string ("") again
  }

  function handleSubmit(event) {
    event.preventDefault();
    // prevents immediate submitting the form, instead we may want to perform other actions, like validation etc.

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());  // { email: abcdef@test.com }

    console.log("items", cartCtx.items);
    console.log("CuData", customerData);

    // sending info abount ordered meals to the backend, on form-submit:
    fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        })
    });
    // this is a request that changes something on backend, and we don't have to wait for response
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
