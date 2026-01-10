import './GamePlay.css'
import { useState, useRef } from 'react'
const GamePlay = ({ verifyLetter, pickedWord, pickedCategory, letters, guessedLeters, wrongLeters, guesses, score }) => {
    const [letter, setLetter] = useState("")
    const letterInputRef = useRef(null)
    const handleSubmit = (e) => {
        e.preventDefault()  
        verifyLetter(letter)


        setLetter("")

        letterInputRef.current.focus()
    }
  return (
<div className='game'>
        <p className="points">
            <span>Pontuacao: {score}</span>
        </p>
        <h1>Advinhe a palavra:</h1>
        <h3 className='tip'>
            Dica sobre a palavra: <span>{pickedCategory}</span>
        </h3>
        <p>Voce ainda tem {guesses} tentativas(s)</p>
        <div className="wordContainer">
            {letters.map((letter, i) => (
                guessedLeters.includes(letter) ? (
                        <span key={i} className='letter'>{letter}</span>
                ) : (
                    <span key={i} className='blankSquare'>_</span>
                )
            ))}
        </div>
        <div className="letterContainer">
            <p>Tente advinhar uma letra da palavra: </p>
            <form onSubmit={handleSubmit }>
                    <input
                type="text"
                name="letter"
                maxLength="1"
                required
                onChange={(e) => setLetter(e.target.value)}
                value={letter}
                ref={letterInputRef}
                />

                <button>Jogar</button>
            </form>
            <div className="wrongLetteersContainer">
                <p>Letras ja utilizadas</p>
                {wrongLeters.map((letter, i) => (
                    <span key={i}>{letter},</span>
                ))}
            </div>
        </div>
    </div>
  )
}

export default GamePlay
