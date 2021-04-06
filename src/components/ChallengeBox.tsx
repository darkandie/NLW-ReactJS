
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountDownContext } from '../contexts/CountDownContext';
import style from '../style/components/ChallengeBox.module.css'

    
export function ChallengeBox () {

    const { activeChallenge, resetChallenge, CompletedChallenge } = useContext(ChallengesContext);
    const {resetCountDown} = useContext(CountDownContext)

    function handleChallengeSucceeded () {
        CompletedChallenge ();
        resetCountDown();
    }

    function handleChallengeFailed () {
        resetChallenge();
        resetCountDown();
    }

    return (
        <div className = { style.ChallengeBoxContainer }>
            { activeChallenge ? (
                <div className = {style.challengeActive}>
                    <header>Ganhe {activeChallenge.amount}</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button 
                        type="button"
                        className={style.challengeFiledButton}
                        onClick= {handleChallengeFailed}
                        >
                        Falhei
                        </button>
                        <button 
                        type="button"
                        className={style.challengeSucceededButton}
                        onClick= {handleChallengeSucceeded}
                        >
                        Completei
                        </button>
                    </footer>
                </div>
                
            ) : (
            <div className = { style.ChallengeNotActive }>
                <strong>Finalize um ciclo para receber desafios. </strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level Up"/>
                    Avance de level completando desafios.
                </p>
            </div>
            )}
            
        </div>
    );
}