  // CSS

  import './App.css'

  // REACT
  import {useCallback, useEffect, useState} from 'react'

  // data
  import { wordsList } from './data/words'

  // COMPONENTS
  import StartScreen from './componentes/StartScreen'
  import GamePlay from './componentes/GamePlay'
  import GameOver from './componentes/GameOver'



  const stages = [
    {id: 1, name: "start"},
    {id: 2, name: "game"},
    {id: 3, name: "end"},
  ]

  function App() {
    const [gameStage, setGameStage] = useState(stages[0].name)
    const [words] = useState(wordsList)

    const [pickedWord, setPickedWord] = useState("")
    const [pickedCategory, setPickedCategory] = useState("")
    const [letters, setLetters] = useState([])

const pickWordAndCategory = useCallback(() => {
  // Pega as categorias
  const categories = Object.keys(words)

  // Escolhe uma categoria aleatória
  const category =
    categories[Math.floor(Math.random() * categories.length)]

  console.log(category)

  // Escolhe uma palavra aleatória da categoria
  const word =
    words[category][
      Math.floor(Math.random() * words[category].length)
    ]

  console.log(word)

  return { word, category }
}, [])


  // start the game
    const startGame = () => {
  const { word, category } = pickWordAndCategory()

  const wordLetters = word
    .toLowerCase()
    .split("")

    console.log(word, category)
    console.log(wordLetters)

    //  fill states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

  setGameStage(stages[1].name)
}

  // process the letter input
  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }
  // reset the game
  const retry = () => {
    setGameStage(stages[0].name)
  }
    return (
      <div className='App'>
        {gameStage === 'start' && <StartScreen
        startGame={startGame}/>}

        {gameStage === 'game' && <GamePlay verifyLetter={verifyLetter}/>}

        {gameStage === 'end' && <GameOver retry={retry}/>}
      </div>
    )
  }

  export default App
