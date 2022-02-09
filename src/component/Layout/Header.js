import React, {Fragment} from 'react';
import mealImage from '../../assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return <Fragment><header className={classes.header}>
      <h2>
        ReactMeals
      </h2>
      <HeaderCartButton onClickCart={props.onOpen}/>
  </header>;
      <div className={classes['main-image']}>
      <img src={mealImage} alt='meals' ></img>
      </div> 
      </Fragment> 
};

export default Header;
