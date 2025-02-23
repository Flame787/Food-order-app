// this component is sending requests to our dummy backend, fetching all 'Meals'  & displaying infos about them

// import { useState, useEffect } from "react";

import MealItem from "./MealItem";
import Error from "./Error";

import useHttp from "../hooks/useHttp";

const requestConfig = {}; // a trick to put instead of config - a 2nd argument of the useHttp-custom-hook
// now we are creating this object only once, and later in component function just re-using the same object

export default function Meals() {
  // const [loadedMeals, setLoadedMeals] = useState([]);

  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);
  // calling custom-hook, arguments are: url, config - but config not needed here, since it's a GET-request
  // we are getting back an object, on which we can use object-destructuring
  // adding an alias-name for data: loadedMeals
  // passing empty object as config, and empty array as initialData
  // so that when component renders for the 1st time, we won't output any items, but it also won't fail & crash

  // alternative, instead of [] for initialData:
  // if (!data) {
  //   return <p>No meals found.</p>
  // }

  console.log(loadedMeals);

  // NOT USED ANYMORE - USING CUSTOM-HOOK useHttp() INSTEAD:
  // useEffect(() => {
  //   async function fetchMeals() {
  //     // const response = fetch("http://localhost:3000/meals", {method: "GET"});
  //     // longer version, but GET-method is already a default method
  //     const response = await fetch("http://localhost:3000/meals");

  //     if (!response.ok) {
  //       // ..
  //     }

  //     // handling the fetched data - we use json-method on response-object:
  //     const mealsData = await response.json();
  //     setLoadedMeals(mealsData);
  //   }

  //   fetchMeals();
  // }, []);
  // hook allows to run sideeffects after the component rendered, and dependancy array decides whan the sideffect will run
  // without useEffect, we would call fetchMeals() inside of component function,
  // this would change state and cause that component re-renders, and we would create an infinite loop.

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
    // {error} - defined in custom-hook useHttp
  }

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
