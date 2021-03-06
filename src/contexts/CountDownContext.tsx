import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from './ChallengesContext';

interface CountDownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountDown: () => void;
    resetCountDown: () => void;
}

interface CountDownProviderProps {
    children :ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountDownContext = createContext ( {} as CountDownContextData)

export function CountDownProvider ( { children } : CountDownProviderProps) {

    const { startNewChallenge } = useContext(ChallengesContext);

    const [ time, setTime ] = useState( 0.1 * 60);
    const [ isActive, setisActive ] = useState (false);
    const [ hasFinished, sethasFinished ] = useState (false);

    const minutes = Math.floor( time / 60 );
    const seconds = time % 60; 

    function startCountDown () {
        setisActive(true);
    }

    function resetCountDown () {
        clearTimeout(countdownTimeout);
        setisActive(false);
        sethasFinished(false);
        setTime( 0.1 * 60 );
        
    }

    useEffect(( ) => {
        if(isActive && time > 0) {
        countdownTimeout = setTimeout(()=> {
            setTime(time - 1);
            },1000)
        } else if ( isActive && time ===0){
            sethasFinished(true);
            setisActive(false);
            startNewChallenge();
        }
    }, [isActive, time] )

    return (
        <CountDownContext.Provider value = {{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountDown,
            resetCountDown
        }}>
            {children}
        </CountDownContext.Provider>
    )
}
