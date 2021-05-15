import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import  challenges  from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

type Challenge = {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

type ChallendsContextData = {
    level: number;
    currentExperience: number;
    challengsCompleted: number;
    experenceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChaleng: () => void;
    resetChalleng: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

type  ChallendsProviderProps = {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengsCompleted: number;
}

export const ChallengsContext = createContext({} as ChallendsContextData);

export function ChallendsProvider( { children, ...rest }: ChallendsProviderProps ) {

    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengsCompleted, setChallengsCompleted] = useState(rest.challengsCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const [isLevelUpModal, setIsLevelUpModal] = useState(false)

    const experenceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    } ,[])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengsCompleted', String(challengsCompleted));
    }, [level, currentExperience, challengsCompleted])
  
    function levelUp()  {
      setLevel(level + 1);
      setIsLevelUpModal(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModal(false);
    }

    function startNewChaleng() {
        //vai gerar um obj da api aleatória.. multiplicando pela qtd objs no challenges e arredondar para baixo
        const randomChallengIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengIndex];

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChalleng() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if(!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;
        
        let finalExperience = currentExperience + amount;

        if(finalExperience >= experenceToNextLevel) {
            finalExperience = finalExperience - experenceToNextLevel;
            levelUp(); //vai upar o usuário de nivel
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null);
        setChallengsCompleted(challengsCompleted + 1)
    }

    return(
        <ChallengsContext.Provider value={{ 
            level, 
            currentExperience, 
            challengsCompleted, 
            experenceToNextLevel,
            levelUp,
            startNewChaleng,
            activeChallenge,
            resetChalleng,
            completeChallenge,
            closeLevelUpModal
        }}>
                { children }
               {isLevelUpModal && <LevelUpModal/>}
        </ChallengsContext.Provider>
    );
}