import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'

const BackDrop = (props) => {
  return <div onClick={props.onClose} className={classes.backdrop}></div>
}

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div>{props.children}</div>
    </div>
  )
}

const Modal = (props) => {
  const domOverlay = document.getElementById('overlay')

  return (
    <Fragment>
      {ReactDOM.createPortal(<BackDrop onClose={props.onClose}/>, domOverlay)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        domOverlay,
      )}
    </Fragment>
  )
}

export default Modal
