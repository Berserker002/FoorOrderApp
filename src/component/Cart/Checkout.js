import React from 'react'
import classes from './Checkout.module.css'
import useInput from '../../store/use-input'

const isEmpty = (value) => value.trim() !== ''
const isFiveChar = (value) => value.trim().length === 6

const Checkout = (props) => {
  const {
    enteredInput: enteredName,
    inputIsValid: nameIsValid,
    inputIsInValid : nameIsInValid, 
    setWasTouched: setNameWasTouched,
    enteredInputHandler: nameInputHandler, 
    inputLostFocusHandler: nameLostFocusHandler,
    reset: resetName
  } = useInput(isEmpty)
  const {
    enteredInput: enteredStreet,
    inputIsValid: streetIsValid,
    inputIsInValid : streetIsInValid, 
    setWasTouched: setStreetWasTouched,
    enteredInputHandler: streetInputHandler,
    inputLostFocusHandler: streetLostFocusHandler,
    reset: resetStreet
  } = useInput(isEmpty)
  const {
    enteredInput: enteredPostalCode,
    inputIsValid: postalCodeIsValid,
    inputIsInValid : postalCodeIsInValid, 
    setWasTouched: setPostalCodeWasTouched,
    enteredInputHandler: postalCodeInputHandler,
    inputLostFocusHandler: postalCodeLostFocusHandler,
    reset: resetPostalCode
  } = useInput(isFiveChar)
  const {
    enteredInput: enteredCity,
    inputIsValid: cityIsValid,
    inputIsInValid : cityIsInValid, 
    setWasTouched: setCityWasTouched,
    enteredInputHandler: cityInputHandler,
    inputLostFocusHandler: cityLostFocusHandler,
    reset: resetCity
  } = useInput(isEmpty)

  let formIsValid = false

  if (nameIsValid && postalCodeIsValid && streetIsValid && cityIsValid) {
    formIsValid = true
  }

  const confirmHandler = (event) => {
    event.preventDefault()
    setNameWasTouched(true)
    setStreetWasTouched(true)
    setPostalCodeWasTouched(true)
    setCityWasTouched(true)
    if (!formIsValid) {
      return
    }
    props.onConfirm({
      enteredName,
      enteredStreet,
      enteredPostalCode,
      enteredCity
    })
    resetName();
    resetStreet();
    resetPostalCode();
    resetCity();

  
  }

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameInputHandler}
          onBlur={nameLostFocusHandler}
        />
        {nameIsInValid && <p>Please Enter a valid name</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" value={enteredStreet}
          onChange={streetInputHandler}
          onBlur={streetLostFocusHandler}/>
        {streetIsInValid && <p>Please Enter a valid Street</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" value={enteredPostalCode}
          onChange={postalCodeInputHandler}
          onBlur={postalCodeLostFocusHandler}/>
        {postalCodeIsInValid && <p>Please Enter a valid postal code (5 Charaters)</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" value={enteredCity}
          onChange={cityInputHandler}
          onBlur={cityLostFocusHandler}/>
        {cityIsInValid && <p>Please Enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} >Confirm</button>
      </div>
    </form>
  )
}

export default Checkout
