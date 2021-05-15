import {  useContext } from 'react';
import { ChallengsContext } from '../contexts/ChallengsContext';
import styles from '../styles/components/CompletedChalleng.module.css';

export function CompletedChallengs() {

    const { challengsCompleted } = useContext(ChallengsContext)

    return(
        <div className={styles.CompletedChallengsContainer}>
            <span>Desafios completos</span>
            <span>{challengsCompleted}</span>
        </div>
    );
}