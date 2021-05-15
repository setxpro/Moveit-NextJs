import { useContext } from 'react';
import { ChallengsContext } from '../contexts/ChallengsContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {

    const { level } = useContext(ChallengsContext);

    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/setxpro.png" alt="Patrick Anjos"/>
            <div>
                <strong>Patrick Anjos</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level { level }
                </p>
            </div>
        </div>
    );
}