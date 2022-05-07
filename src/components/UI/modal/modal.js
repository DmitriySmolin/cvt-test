import React from 'react';
import classes from './modal.module.scss';
import {useNavigate} from 'react-router-dom';

const Modal = ({children}) => {
  const modalCls = [classes.modal, classes.active];
  const contentCls = [classes.modalContent, classes.active];
  const navigate = useNavigate();
  return (
    <div
      className={modalCls.join(' ')}
      onClick={() => navigate(-1)}
    >
      <div
        className={contentCls.join(' ')}
        onClick={(event => event.stopPropagation())}
      >
        {children}
      </div>
    </div>

  );
};

export default Modal;
