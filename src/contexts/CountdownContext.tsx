import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengsContext } from "./ChallengsContext";

type CountdownTextData = {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdow: () => void;
}

type ChallangeProviderProps = {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownTextData)

let countTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: ChallangeProviderProps) {

    const { startNewChaleng } = useContext(ChallengsContext);

    const [ time, setTime ] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);  //como ele inicia
    const [hasFinished, setHasFinished] = useState(false);


    const minutes = Math.floor(time / 60); //arredondar para baixo
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
    }
    function resetCountdow() {
        clearTimeout(countTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(0.1  * 60); //volta para o estado inicial
    }
    useEffect(() => {

        if(isActive && time > 0) {
            countTimeout = setTimeout(() => {

                setTime(time - 1); //reduz o time em um segundo

            }, 1000); //executa a função depois de um segundo
        
        } else if(isActive && time === 0) {
            setHasFinished(true); //finalizou
            setIsActive(false); //desativado
            startNewChaleng();
        }

    }, [isActive, time]); //executa a função sempre que o valor active e o time mudar
    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdow
        }}>
            { children }
        </CountdownContext.Provider>
    );
}