import './GamePlay.css'

const GamePlay = ({ verifyLetter }) => {
  return (
<div className='game'>
        <p className="points">
            <span>Pontuacao: 000</span>
        </p>
        <h1>Advinhe a palavra:</h1>
        <h3 className='tip'>
            Dica sobre a palavra: <span>Dica...</span>
        </h3>
        <div className="wordContainer">
            <span className='letter'>A</span>
            <span className="blankSquare"></span>
        </div>
        <div className="letterContainer">
            <p>Tente advinhar uma letra da palavra: </p>
            <form>
                <input type="text" name='letter' maxLength='1' required />
                <button>Jogar</button>
            </form>
            <div className="wrongLetteersContainer">
                <p>Letras ja utilizadas</p>
                <span>a, </span>
                <span>b, </span>
            </div>
        </div>
    </div>
  )
}

export default GamePlay
