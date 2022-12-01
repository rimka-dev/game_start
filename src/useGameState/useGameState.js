import { useEffect, useState } from 'react';

// this is à custom hook
function useGameState() {
    //===== Math science ===========
    const utils = {
        // Sum an array
        sum: arr => arr.reduce((acc, curr) => acc + curr, 0),
        // create an array of numbers between min and max (edges included)
        range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),
        // pick a random number between min and max (edges included)
        random: (min, max) => min + Math.floor(max * Math.random()),
        // Given an array of numbers and a max ...
        // Pick a random sum (< max) from the set of all available sums in arr
        randomSumIn: (arr, max) => {
            const sets = [[]];
            const sums = [];
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0, len = sets.length; j < len; j++) {
                    const candidateSet = sets[j].concat(arr[i]);
                    const candidateSum = utils.sum(candidateSet);
                    if (candidateSum <= max) {
                        sets.push(candidateSet);
                        sums.push(candidateSum);
                    }
                }
            }
            return sums[utils.random(0, sums.length)];
        }
    };

    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, SetAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, SetCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(20);

    useEffect(() => {
        if (secondsLeft > 0 && availableNums.length > 0) {
            const timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        }
    });
    const setGameState = (newCandidateNums) => {
        if (utils.sum(newCandidateNums) !== stars) {
            SetCandidateNums(newCandidateNums);
        } else {
            const newAvailableNums = availableNums.filter(
                n => !newCandidateNums.includes(n)
            );
            setStars(utils.randomSumIn(newAvailableNums, 9));
            SetAvailableNums(newAvailableNums);
            SetCandidateNums([]);

        }
    }

    return { stars, availableNums, candidateNums, secondsLeft, utils, setGameState };
}

export default useGameState;