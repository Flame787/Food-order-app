// this component is sending requests to our dummy backend, fetching all 'Meals'  & displaying infos about them

import { useState, useEffect } from "react";

import MealItem from "./MealItem";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      // const response = fetch("http://localhost:3000/meals", {method: "GET"});
      // longer version, but GET-method is already a default method
      const response = await fetch("http://localhost:3000/meals");

      if (!response.ok) {
        // ..
      }

      // handling the fetched data - we use json-method on response-object:
      const mealsData = await response.json();
      setLoadedMeals(mealsData);
    }

    fetchMeals();
  }, []);
  // hook allows to run sideeffects after the component rendered, and dependancy array decides whan the sideffect will run
  // without useEffect, we would call fetchMeals() inside of component function,
  // this would change state and cause that component re-renders, and we would create an infinite loop.

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        // <li key={meal.id}>{meal.name}</li>
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
  // using state, and mapping every meal-item into a <li>
}
