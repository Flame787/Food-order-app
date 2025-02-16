import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";

function App() {
  return (
    <CartContextProvider>
      {/* <h1>You got this 💪</h1>
      <p>Stuck? Not sure how to proceed?</p>
      <p>Don't worry - we've all been there. Let's build it together!</p> */}

      <Header />
      <Meals />
    </CartContextProvider>
  );
}

export default App;

/* 

1. npm install  -> install dependencies for frontend

2. npm run dev  -> to start the frontend server 

*/
