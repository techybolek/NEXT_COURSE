import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

function Modal({ children, onClose }) {
  const modalRoot = document.getElementById('modal-root') || document.getElementById('root');

  return ReactDOM.createPortal(
    <div className={classes.backdrop} onClick={onClose}>
      <dialog open className={classes.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </dialog>
    </div>,
    modalRoot
  );
}

export default Modal;
