import Button from "./UI/Button";

// importing the function:
import { currencyFormatter } from "../util/formatting.js";

export default function MealItem({ meal }) {
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        {/* relative path to each picture via backend-server link + dynamic {meal.img} - with backticks `` and $ sign */}
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
          
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          {/* <button>Add to Cart</button> */}
          <Button>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
