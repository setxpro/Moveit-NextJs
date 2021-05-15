import { useContext } from 'react';
import { ChallengsContext } from '../contexts/ChallengsContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChallengBox.module.css';

export function ChallengBox() {

    const { activeChallenge, resetChalleng, completeChallenge } = useContext(ChallengsContext);
    const { resetCountdow } = useContext(CountdownContext);

    function handleChallengeSucceded() {
        completeChallenge();
        resetCountdow();
    }

    function handleChanllengeFailed() {
        resetChalleng();
        resetCountdow();
    }

    return(
        <div className={styles.challengBoxContainer}>
            { activeChallenge 
              ? (
                <div className={styles.challengActive}>
                    <header>Ganhe { activeChallenge.amount } xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`}  />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button 
                        type="button"
                        className={styles.challengFailedButton}
                        onClick={handleChanllengeFailed}
                        >
                            Falhei
                        </button>

                        <button 
                        type="button"
                        className={styles.challengSuccededButton}
                        onClick={handleChallengeSucceded}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) :
                (
                <div className={styles.challengNotActive}>
                    <strong>Finlize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up"/>
                        Avance de level completando desafios.
                    </p>
                </div>
            ) }
        </div>
    );
}