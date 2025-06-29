import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import { useNavigate } from 'react-router-dom';

function Modal({ children }) {
  const navigate = useNavigate();

  function onClose() {
    console.log('onClose');
    navigate('..');
  }

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
