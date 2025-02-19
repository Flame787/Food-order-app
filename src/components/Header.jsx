import { useContext } from "react";

import Button from "./UI/Button";
import logoImg from "../assets/logo.jpg";
import CartContext from "../store/CartContext.jsx"; // importing CartContext-object
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header() {
  const cartCtx = useContext(CartContext);

  // listen to another context, so the Modal can open when the Cart-button was pressed:
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);
  // reduce method - we can reduce an array to a single value, a number
  // reduce has a function as 1st argument and as 2nd argument a starting value, f.e. 0
  // a function (1st argument) itself gets 2 arguments: new value which we want to derrive, and every item of the array on which we call reduce-method

  // function that uses userProgressCtx:
  function handleShowCart() {
    userProgressCtx.showCart(); // showCart je funkcija definirana u contextu koji ovdje dohvaćamo
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Restaurant logo image" />
        <h1>benny's burgers</h1>
      </div>
      <nav>
        {/* <button>Cart (0)</button> */}

        {/* <Button textOnly={true}>Cart (0)</Button> */}
        {/* // no prop-value needed here; just adding the textOnly prop will automatically set it to true: */}
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
