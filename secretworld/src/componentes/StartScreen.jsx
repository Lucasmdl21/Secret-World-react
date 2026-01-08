import './StartScreen.css'


const StartScreen = ({ startGame }) => {
  return (
    <div className='start'>
      <h1>Secret word</h1>
      <p>
        Welcome to the secret word game! Try to guess the secret word by entering letters. Good luck!
      </p>
      <button onClick={startGame}>let's go</button>
    </div>
  )
}

export default StartScreen
