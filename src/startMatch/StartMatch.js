import './StartMatch.css';
import React from 'react';
import ButtonNumber from '../button/ButtonNumber';
import StarsDisplay from '../starsDisplay/StarsDisplay';
import PlayAgain from '../playAgain/PlayAgain';
import useGameState from '../useGameState/useGameState';
const StartMatch = (props)=> {
   const {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    utils,
    setGameState,
   } = useGameState()
 
    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    // const gameIsDone = availableNums.length === 0;
    // const gameIsLost = secondsLeft === 0;
    const gameStatus = availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost':'active';

    const numberStatus = (number)=>{
        if (!availableNums.includes(number)) {
            return 'used'
        }
        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong':'candidate';
        }
        return 'available' 
    };

    const onNumberClick = (number, currentStatus)=>{
        if (gameStatus !== 'active' || currentStatus === 'used') {
            return;
        }
        const newCandidateNums = currentStatus === 'available' 
        ? candidateNums.concat(number) : 
        candidateNums.filter(cn => cn !== number);
        setGameState(newCandidateNums);
    };

    return (  
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    {
                      gameStatus !=='active' ? (
                        <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus}/>
                      ):
                      (<StarsDisplay count={stars}/>) 
                    }
                </div>
                <div className="right">
                    {
                        utils.range(1, 9).map(number => 
                        <ButtonNumber key={number} 
                        number ={number}
                        status={numberStatus(number)}
                        onClick={onNumberClick}
                        
                        />)
                    }
                    
                </div>
            </div>
            <div className="timer">Time Remaining :&nbsp; <b>{secondsLeft}</b> </div>
        </div>
    );
};

export default StartMatch ;