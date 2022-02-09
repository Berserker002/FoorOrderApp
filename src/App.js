import { useState } from 'react'
import Header from './component/Layout/Header'
import Meals from './component/Meals/Meals'
import Cart from './component/Cart/Cart'
import CartPovider from './store/CardPovider';

function App() {

  const [cartIsOpen, setCartIsOpen] = useState(false);

  const cartOpenHandler = () =>{

    setCartIsOpen(true);

  }
  const cartCloseHandler = () =>{

    setCartIsOpen(false);

  }

  return (
    <CartPovider>
      {cartIsOpen && <Cart onClose={cartCloseHandler}/>}
      <Header onOpen={cartOpenHandler}/>
      <main>
        <Meals />
      </main>
    </CartPovider>
  )
}

export default App
