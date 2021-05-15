import {  useContext } from 'react';
import styles from '../styles/components/Countdow.module.css';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { CountdownContext } from '../contexts/CountdownContext';
    


export function Countdow() {

    const { 
        minutes, 
        seconds, 
        isActive,
        hasFinished, 
        startCountdown, 
        resetCountdow 
    } = useContext(CountdownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');
    
    return(
        <div>
            <div className={styles.CountdowContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondsLeft}</span>
                    <span>{secondsRight}</span>
                </div>
            </div>

            { hasFinished 
              ? (
                <button 
                    disabled
                    className={styles.CountdownButton}
                >
                    Ciclo encerrado
                    <CheckCircleIcon style={{ color: 'var(--green)', marginLeft: '1rem'}}/>
                </button>
            ) : (
                <>
                    { isActive  
                        ? ( 
                        <button 
                            type="button" 
                            className={`${styles.CountdownButton} ${styles.CountdownButtonActive}`}
                            onClick={resetCountdow}
                        >
                            Abandonar ciclo
                        </button>
                    ) : (
                        <button 
                            type="button" 
                            className={styles.CountdownButton}
                            onClick={startCountdown}
                        >
                            Iniciar um ciclo
                        </button>
                    ) }
                </>
            )}

            
           

            
        </div>
    );
}