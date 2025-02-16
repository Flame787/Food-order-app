import Button from "./UI/Button";
import logoImg from "../assets/logo.jpg";

export default function Header() {
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
        <Button textOnly>Cart (0)</Button>
      </nav>
    </header>
  );
}
