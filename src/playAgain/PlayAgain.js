import './PlayAgain.css'
import React from 'react';

function PlayAgain(props) {
    return ( 
        <div className='playAgain'>
            <div style={{margin:"10px", color: props.gameStatus === 'lost'?'red':'green' }}>
               <h2>{props.gameStatus === 'lost'? 'Game Over !': `You win!`}</h2> 
            </div>
            <button onClick={props.onClick} className='btnPlay'>Play Again</button>
        </div>
     );
}

export default PlayAgain ;