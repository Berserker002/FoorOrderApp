import React, { useContext, useEffect, useState } from 'react'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from '../../store/cart-context'

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext)
  const {items} = cartCtx;

  const [cartAnimation, setCartAnimation] = useState(false);

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount
  }, 0)

  const btnClass = `${classes.button} ${cartAnimation ? classes.bump : ''}`

  useEffect(() => {
    if(items.length === 0){
      return;
    }
      setCartAnimation(true)

      const timer = setTimeout(() => {
        setCartAnimation(false)
      }, 300)
      return () =>{
        clearTimeout(timer)
      }
  } ,[items])

  return (
    <button className={btnClass} onClick={props.onClickCart}>
      <div className={classes.icon}>
        <CartIcon />
      </div>
      <span>My Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
