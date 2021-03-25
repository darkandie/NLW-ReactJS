import { useContext } from 'react';
import { CountDownContext } from '../contexts/CountDownContext'
import styles from '../style/components/CountDown.module.css';


export function CountDown () {

    const { minutes, 
        seconds, 
        hasFinished, 
        isActive, 
        startCountDown, 
        resetCountDown 
    } = useContext(CountDownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart( 2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart( 2, '0').split('');

    

    return (
    <div>
        <div className = { styles.CountDownContainer}>
            <div>
                <span>{minuteLeft}</span>
                <span>{minuteRight}</span>
            </div>
                <span>:</span>
            <div>
                <span>{secondLeft}</span>
                <span>{secondRight}</span>
            </div>
        </div> 

        {hasFinished ? (
          <button
          disabled
          className = {styles.countDownButton}
          >
              Ciclo encerrado
          </button>
          ) : (
        <>
            {isActive ? 
                (<button 
                  type="button" 
                  className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
                  onClick = {resetCountDown}
                >
                  Abandonar um ciclo.
                </button> 
            ) : (
               <button 
                  type="button" 
                  className={styles.countDownButton}
                  onClick = {startCountDown}
                >
                  Iniciar um ciclo.
                </button>
            )}
        </>
    )}
        
    </div>    
    );
}