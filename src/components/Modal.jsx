import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

function Modal({ children, onClose }) {
  const modalRoot = document.getElementById('modal-root') || document.getElementById('root');
  const rootName = modalRoot.id;

  return ReactDOM.createPortal(
    <>
      <div className={classes.backdrop} onClick={onClose}></div>
      <dialog open className={classes.modal}>
        <p>This modal is attached to: {rootName}</p>
        {children}
      </dialog>
    </>,
    modalRoot
  );
}

export default Modal;