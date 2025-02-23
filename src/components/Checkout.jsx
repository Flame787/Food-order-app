import { useContext } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import Error from "./Error.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";

export default function Checkout() {
  // using context:
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const requestConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body:
  }; // a trick to put instead of config - a 2nd argument of the useHttp-custom-hook
  // now we are creating this object only once, and later in component function just re-using the same object

  // adding custom-hook:
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);
  // sendRequest-function - important here because we need to send POST-request manually (not triggered by itself)

  // helper-constant to calculate total price of all items in the cart:
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout(); // sets userProgressCtx to empty string ("") again
  }

  // clearing the cart after an order has been succecfully sent:
  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();   // clearing data after a succesfull order, so it can be resetted and done all over again
  }

  function handleSubmit(event) {
    event.preventDefault();
    // prevents immediate submitting the form, instead we may want to perform other actions, like validation etc.

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); // { email: abcdef@test.com }

    console.log("items", cartCtx.items);
    console.log("CuData", customerData);

    // NEW - when using the custom-hook:
    sendRequest(
      JSON.stringify({
        // sendRequest(data)  - defined in custom-hook useHttp
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );

    // NOT NEEDED ANYMORE, SINCE USING THE CUSTOM HOOK:

    // sending info abount ordered meals to the backend, on form-submit:
    // fetch("http://localhost:3000/orders", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     order: {
    //       items: cartCtx.items,
    //       customer: customerData,
    //     },
    //   }),
    // });
    // this is a request that changes something on backend, and we don't have to wait for response
  }

  // default - rendering buttons:
  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  // but if isSending-action is currently true (if sending-customer-data in Checkout-Modal is in progress),
  // then first a message is shown, and normal buttons are shown only later, after the Cu-data was sent already:
  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  // Success-Modal: if we received a valid response and no error (if Cu-data was sent succesfully):
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted succesfully.</p>
        <p>
          We will send you a confirmation via email within next few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
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

        {/* conditionally showing error: */}
        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">
          {/* <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button> */}
          {/* variable 'actions' - buttons, or a message, will be shown conditionally: */}
          {actions}
        </p>
      </form>
    </Modal>
  );
}
