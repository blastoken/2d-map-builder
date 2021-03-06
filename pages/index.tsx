import type { NextPage } from 'next'
import Head from 'next/head'
import Square from '../components/square'
import styled from 'styled-components';
import Triangle from '../components/triangle';
import Circle from '../components/circle';
import Link from 'next/link';
import Grid from '../components/grid';
import { motion } from "framer-motion";
import { Countdown } from '../components/countdown';
const WrapExposition = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: black;
  padding: 2rem;
  overflow: hidden;
  html,body{
    overflow: hidden;
  }
`;

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>2D Maps Builder</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WrapExposition>
        <div className="menu">
          <nav>
            <ul>
              <li><Link href="/"><a>Home</a></Link></li>
              <li><Link href="grids"><a>Grids</a></Link></li>
            </ul>
          </nav>
        </div>
      </WrapExposition>
        <Countdown/>

      <footer>
        
      </footer>
    </div>
  )
}

export default Home
