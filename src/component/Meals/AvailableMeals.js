import React, { useEffect, useState } from 'react'
import MealItem from './MealItem/MealItem'
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ]

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
      fetchtMealsHandler().catch((error) => {
        setIsLoading(false);
        setError(error.message)
      })
  }, [])

  const fetchtMealsHandler = async () => {
      setIsLoading(true)
      const response = await fetch(
        'https://https-react-668e7-default-rtdb.firebaseio.com/meals.json',
      )

      if (!response.ok) {
        throw new Error('Something went wrong!')
      }
      const data = await response.json()
      const transformedMeals = []

      for (const key in data) {
        transformedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        })
      }
      setMeals(transformedMeals)
      setIsLoading(false);
      
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))

  let content = mealsList

  if (error) {
    content = <p className={classes.errorHandle}>{error}</p>
  }
  if (isLoading) {
    content = <p className={classes.loading}>Loading Meals...</p>
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
