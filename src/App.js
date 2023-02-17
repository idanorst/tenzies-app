import React from 'react'
import './style.css'
import Die from './components/Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
import PopUp from './components/PopUp'

export default function App() {
  // Setting up all the different useStates
  const [dice, setDice] = React.useState(allNewDice)
  const [tenzies, setTenzies] = React.useState(false)
  const [count, setCount] = React.useState(0)
  const [clicked, setClicked] = React.useState(false)
  const [startTime, setStartTime] = React.useState(null)
  const [diff, setDiff] = React.useState(null)
  const [timeRegistered, setTimeRegistered] = React.useState(false)
  const [newBestTime, setNewBestTime] = React.useState(false)
  const [wrongDie, setWrongDie] = React.useState(false)
  const [showPopUp, setShowPopUp] = React.useState(false)
  // and variables
  const bestTime = JSON.parse(localStorage.getItem('bestTime'))


  // Creating a useEffect
  React.useEffect(() => {
    // which register the value and count of the dice
    let value
    let sameValue = false
    let count = 0

    // Setting the starttime for the game
    if (!timeRegistered && startTime === null) {
      const now = new Date()
      setStartTime(now.getTime())
      setTimeRegistered(true)
    }
    
    // Checking wether the die is held or not
    dice.map(die => {
      if (die.isHeld && !value) {
        value = die.value
      }
      if (die.isHeld && die.value === value) {
        count++
      } else {
        count--
      }
      if (die.isHeld && die.value !== value) {
        setShowPopUp(true)
      }
    })
    // If all the dice are held
    if (count === dice.length){
      // then we have tenzies
      setTenzies(true)
      // and we can calculate the time used
      const endTime = Date.now()
      const usedTime = endTime - startTime
      var minutes = Math.floor((usedTime / 60000) % 60)
      var seconds = Math.floor((usedTime / 1000) % 60)
      var difference = minutes + ":" + (seconds < 10 ? '0' : '') + seconds
      setDiff(difference)
      // and register a new best time
      if (bestTime === null) {
        localStorage.setItem('bestTime', JSON.stringify(difference))
      } else if (difference < bestTime) {
        localStorage.setItem('bestTime', JSON.stringify(difference))
        setNewBestTime(true)
      }
    }
    
    // Soultion from instructor 
    /* const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue){
      setTenzies(true)
      console.log("You won!")
    } */
  }, [dice])

  // A function to roll out 10 new dice
  function allNewDice() {
    const diceArray = []
    for (let i = 0; i < 10; i++){
      diceArray.push(generateNewDice())
    }
    return diceArray
  }
  
  // A function that generates a new random die
  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6), 
      isHeld: false,
      id: nanoid()
    }
  }

  // Creating die elements
  const diceElements = dice.map(die => {
    return (
      <Die 
        key={die.id} 
        value={die.value} 
        isHeld={die.isHeld} 
        id={die.id} 
        clicked={clicked}
        holdDice={holdDice}
        tenzies={tenzies} />
    )
  })

  // A function for the roll-button
  function rollDice() {
    setClicked(true)
    setShowPopUp(false)
    // If we have tenzies, the button turns to a "New game"-button, and restarts the game
    if (tenzies) {
      setDice(allNewDice())  
      setTenzies(false)
      setStartTime(new Date().getTime())
      setNewBestTime(false)
      setCount(0)
      setShowPopUp(false)
    } else {
      // if not, just the dice which is not held, will be switched to new ones.
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
          die : 
          generateNewDice()
      }))
      setCount(oldCount => oldCount + 1)
    }
    }

  // A function which makes it possible to mark the dice that are equal
  function holdDice(id) {  
    // Solution with .map()
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
      {...die, isHeld: !die.isHeld} :
      die
    }))
    setShowPopUp(false)
    setClicked(false)
      // Solution with for loop
    /* const array = []
    for (let i = 0; i < dice.length; i++){
      if (dice[i].id === id) {
        dice[i].isHeld = !dice[i].isHeld
        array.push(dice[i])
      } else {
        array.push(dice[i])
      }
    }
    setDice(array) */
  }


  // The HTML content we want to return from the component
  return (
    <main>
      {showPopUp && <PopUp handleClick={() => setShowPopUp(false)}/>}
      <h1 className='title'>Tenzies</h1>
      {tenzies ? <p>Congrats, you won! You used {count} rolls. Time used: {diff}</p> : <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>}
      {newBestTime && <p className="bestTime">Congrats, it's also a new best time!</p>}
      <div className='dice-container'>
        {diceElements}
      </div>
      <button 
        className='roll-button'
        onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      {tenzies && <Confetti />}
    </main>
  )
}

