import React, { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartData = {
  items: [],
  totalAmount: 0,
}

const CartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmounts =
      state.totalAmount + action.item.amount * action.item.price

    const existedIndex = state.items.findIndex(
      (item) => item.id === action.item.id,
    )

    const existedItem = state.items[existedIndex]
    let updatedItems

    if (existedItem) {
      const updatedItem = {
        ...existedItem,
        amount: existedItem.amount + action.item.amount,
      }

      updatedItems = [...state.items]
      updatedItems[existedIndex] = updatedItem
    } else {
      updatedItems = state.items.concat(action.item)
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmounts,
    }
  } else if (action.type === 'REMOVE') {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id,
    )
    const existingItemCart = state.items[existingItemIndex]
    const updatedTotalAmounts = state.totalAmount - existingItemCart.price
    let updatedItems
    if (existingItemCart.amount > 1) {
      const updatedItem = {
        ...existingItemCart,
        amount: existingItemCart.amount - 1,
      }
      updatedItems = [...state.items]
      updatedItems[existingItemIndex] = updatedItem
    } else if (existingItemCart.amount === 1) {
      updatedItems = state.items.filter(
        (item) => item.id !== existingItemCart.id,
      )
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmounts,
    }
  }

  if(action.type === 'CLEAR'){
    return defaultCartData
  }

  return defaultCartData
}

const CartPovider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    CartReducer,
    defaultCartData,
  )
  const addItemToCartHandler = (item) => {
    dispatchCartState({ type: 'ADD', item: item })
  }

  const removeItemToCartHandler = (id) => {
    dispatchCartState({ type: 'REMOVE', id: id })
  }

  const cartClearHandler = () => {
    dispatchCartState({
      type : 'CLEAR'
    })
  }

  const providerValues = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    clearCart: cartClearHandler
  }

  return (
    <CartContext.Provider value={providerValues}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartPovider
