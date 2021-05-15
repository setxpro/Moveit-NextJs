import { useContext } from 'react';
import { ChallengsContext } from '../contexts/ChallengsContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
    
    const { currentExperience, experenceToNextLevel } = useContext(ChallengsContext);
    const percentToNextLevel = Math.round(currentExperience * 100) / experenceToNextLevel;

    return(
        <header className={styles.experienceBar}>
            <span>0 xp</span>
                <div>
                    <div style={{ width: `${percentToNextLevel}%` }}/>

                    <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
                        {currentExperience} xp
                    </span>
                </div>
            <span>{experenceToNextLevel} xp</span>
        </header>
    );
}