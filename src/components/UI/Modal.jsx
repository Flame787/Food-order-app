import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

export default function Modal({ children, open, onClose, className = "" }) {
  // using Portal feature, so that we can use Modal from anywhere in the component tree,
  // but we want to inject this Modal/<dialog> in the specific hrml-area that we define upfront:
  // <div id="modal"></div>
  // className-prop - enables that the Modal can be styled for outside, depending in which child componente it's built-in
  // className = "" - default: empty string, but only if className-prop is not defined from outside (to avoid 'undefined')

  // saving the reference to the <dialog>-html-element with useRef-hook:
  const dialog = useRef();

  useEffect(() => {
    // storing the value of the ref:
    const modal = dialog.current;

    // opening the dialog programmatically:
    if (open) {
      //   dialog.current.showModal();
      modal.showModal();
    }

    // cleanup-function - executed whenever the useEffect function runs again (when open-prop changes)
    return () => modal.close();
    
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
