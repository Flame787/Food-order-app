// a reusable button component:

export default function Button({ children, textOnly, className, ...props }) {
  // adding children-prop; children - all the text around which the Button will be wrapped
  // ...props - rest-property, where we look for all other props that may be added to a Button, and
  // we merge them into a new object called props (contains all other props)

  // const cssClasses = textOnly ? `text-button ${className}` : "button";

  // or another way for the same - appending additional classNames:
  let cssClasses = textOnly ? "text-button" : "button";
  cssClasses += " " + className;

  return (
    <button className={cssClasses} {...props}>  
    {/* adding additional css-classes, and all other props, if existing */}
      {children}
    </button>
  );
}
