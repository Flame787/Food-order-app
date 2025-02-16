import { useContext } from "react";

import Button from "./UI/Button";

// importing the function:
import { currencyFormatter } from "../util/formatting.js";
import CartContext from "../store/CartContext.jsx"; // importing CartContext-object

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  // function for adding new item to cart whenever the Add-button is clicked:
  function handleAddToCart() {
    cartCtx.addItem(meal);
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        {/* relative path to each picture via backend-server link + dynamic {meal.img} - with backticks `` and $ sign */}
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>

          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          {/* <button>Add to Cart</button> */}
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
