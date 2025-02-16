// currency formatter -> imported to MealItem.jsx:

export const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});
// new internalization object called NumberFormat - we can set market for which we want to form a price
// formatter is a bit overkill, but good to know if we have numbers of different formats