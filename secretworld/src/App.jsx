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

      const [guessedLeters, setGuessedLeter] = useState([])
      const [wrongLeters, setWrongLeter] = useState([])
      const [guesses, setGuesses] = useState(3)
      const [score, setScore] = useState(0)

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
    const verifyLetter = (letter) => {
      const normalizedLetter = letter.toLowerCase()

      // check if letter has already been utilized
      if(guessedLeters.includes(normalizedLetter) ||
      wrongLeters.includes(normalizedLetter)){
        return
      }
      // push guessed letter or remove a guess
      if(letters.includes(normalizedLetter)){
        setGuessedLeter((actualGuessedLeters) => [
          ...actualGuessedLeters,
          normalizedLetter,
        ])
      } else {
        setWrongLeter((actualWrongLeters) => [
          ...actualWrongLeters,
          normalizedLetter,
        ])

        setGuesses((actualGuesses) => actualGuesses -1)

    }

  }
  const clearLetterStates  = () => {

      setGuessedLeter([])
      setWrongLeter([])

  }
  // check if guesses ended
  useEffect(() => {
    if(guesses <=0){
      // reset al states
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  }, [guesses])
  
  // check win condition
  useEffect(() => {

    const uniqueLetters = [...new Set(letters)]

    // win condition
    if(guessedLeters.length === uniqueLetters.length){
      // add score
      setScore((actualScore) => actualScore +=100)

      // restart game with new word
      clearLetterStates()

      startGame()
    }

  }, [guessedLeters, letters, startGame])
    // reset the game
    const retry = () => {
      setScore(0)
      setGuesses(3)

      setGameStage(stages[0].name)
    }
      return (
        <div className='App'>
          {gameStage === 'start' && <StartScreen
          startGame={startGame}/>}

          {gameStage === 'game' && <GamePlay verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLeters={guessedLeters}
          wrongLeters={wrongLeters}
          guesses={guesses}
          score={score}
            />}

          {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
        </div>
      )
    }

    export default App
