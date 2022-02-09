import { useState } from "react";

const useInput = (validity) => {
    const [enteredInput, setEnteredInput] = useState('');
    const [wasTouched, setWasTouched] = useState(false);

    const inputIsValid = validity(enteredInput);
    const inputIsInValid = !inputIsValid && wasTouched;


    const enteredInputHandler = (event) => {
        setEnteredInput(event.target.value);       
    }

    const inputLostFocusHandler = () => {
        if(!inputIsValid){
        setWasTouched(true);
        }
    }

    const reset = () => {
        setEnteredInput('')
        setWasTouched(false);
    }

    return {
        enteredInput,
        inputIsValid,
        inputIsInValid,
        setWasTouched,
        enteredInputHandler,
        inputLostFocusHandler,
        reset
    }

};

export default useInput;