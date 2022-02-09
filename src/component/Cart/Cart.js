import React, { useContext, useState } from 'react'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = (props) => {
  const [showFormDetails, setShowFormDetals] = useState(false)
  const [isSendingOrder, setIsSendingOrder] = useState(false)
  const [sendOrder, setSendOrder] = useState(false)
  const [isError, setIsError] = useState(null)
  const cartCtx = useContext(CartContext)

  const showOrderButton = cartCtx.items.length > 0
  const addItemCartHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 })
  }

  const removeItemCartHandler = (id) => {
    cartCtx.removeItem(id)
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          price={item.price}
          key={item.id}
          name={item.name}
          amount={item.amount}
          onAdd={addItemCartHandler.bind(null, item)}
          onRemove={removeItemCartHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  )

  const fixedTotalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

  const orderSendHandler = async (userData) => {
    setIsSendingOrder(true)
    setIsError(null)
    try {
      const response = await fetch(
        'https://https-react-668e7-default-rtdb.firebaseio.com/orders.json',
        {
          method: 'POST',
          body: JSON.stringify({
            orderData: userData,
            CartItems: cartCtx.items,
          }),
        },
      )
      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      setSendOrder(true)
      cartCtx.clearCart()
    } catch (err) {
      setIsError(err.message)
    }
    setIsSendingOrder(false)
  }

  const cartContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{fixedTotalAmount}</span>
      </div>
      {showFormDetails && (
        <Checkout onCancel={props.onClose} onConfirm={orderSendHandler} />
      )}
      {!showFormDetails && (
        <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={props.onClose}>
            close
          </button>
          {showOrderButton && (
            <button
              className={classes.button}
              onClick={() => {
                setShowFormDetals(true)
              }}
            >
              order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  )

  const sendingOrderLoad = <p>Sending your order...</p>

  const doneOrder = (
    <React.Fragment>
      <p>Your Order has been successfully added...</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          close
        </button>
      </div>
    </React.Fragment>
  )

  const errorInOrder = <p>{isError}</p>

  return (
    <Modal onClose={props.onClose}>
      {!isSendingOrder && !sendOrder && cartContent}
      {isSendingOrder && sendingOrderLoad}
      {sendOrder && doneOrder}
      {isError && errorInOrder}
    </Modal>
  )
}

export default Cart
