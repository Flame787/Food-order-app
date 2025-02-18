import { createContext, useState } from "react";

const UserProgressContext = createContext({
  // context-object, with progress-value and different functions
  progress: "", // value initially: empty string, but later can be: 'cart', or 'checkout'
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function UserProgressContextProvider({ children }) {

  const [userProgress, setUserProgress] = useState("");

  function showCart() {
    setUserProgress("cart");
  }

  function hideCart() {
    setUserProgress("");
  }

  function showCheckout() {
    setUserProgress("checkout");
  }

  function hideCheckout() {
    setUserProgress("");
  }


  const userProgressCtx = {
    progress: userProgress,    // setting attribute 'progress' to userProgress-state (modified by functions)
    showCart,
    hideCart,
    showCheckout,
    hideCheckout
}

  return (
    <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
  );
}

export default UserProgressContext;
