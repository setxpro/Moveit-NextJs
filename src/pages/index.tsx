import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { CompletedChallengs } from "../components/CompletedChalleng";
import { Countdow } from "../components/Countdown";
import { ExperienceBar } from "../components/ExprerienceBar";
import { Profile } from '../components/Profile';
import { ChallengBox } from "../components/ChallengBox";

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallendsProvider } from '../contexts/ChallengsContext';

type HomeProps = {
  level: number;
  currentExperience: number;
  challengsCompleted: number;
}


export default function Home(props: HomeProps) {

  return (
    <ChallendsProvider 
      level={props.level} 
      currentExperience={props.currentExperience} 
      challengsCompleted={props.challengsCompleted} 
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>
            <ExperienceBar/>
          <CountdownProvider>
          <section>
            <div>
                <Profile/>
                <CompletedChallengs/>
                <Countdow/>
            </div>
            <div>
                <ChallengBox/>
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallendsProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengsCompleted } = ctx.req.cookies;

  return{
      props: {
        level: Number(level),
        currentExperience: Number(currentExperience),
        challengsCompleted: Number(challengsCompleted)
      }
    
  }
}