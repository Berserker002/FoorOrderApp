import React, { useRef, useState } from 'react'
import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'


const MealItemForm = (props) => {
  const inputRef = useRef()
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountSubmitHandler = (event) => {
    event.preventDefault()
    const amount = inputRef.current.value;
    const amountFixed = +amount;
    

    if(amount.trim().length === 0 || amountFixed > 5 || amountFixed < 1 ){
        setAmountIsValid(false);
        return;
    }

    props.onAddToCart(amountFixed);

  }

  return (
    <form className={classes.form} onSubmit={amountSubmitHandler}>
      <Input
        label="Amount"
        ref={inputRef}
        input={{
          type: 'number',
          id: 'amount_' + props.id,
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button className={classes.button}>+ Add</button>
      {!amountIsValid && <p>Please enter the amount(1-5)</p>}
    </form>
  )
}

export default MealItemForm
