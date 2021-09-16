import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Confetti from "react-confetti";

const CountDownContainer = styled(motion.div)`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: #313A3A;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const Countdown = () => {
    const [number, setNumber] = useState(0);
    const [complete, setComplete] = useState(false);

    useEffect(
    ()=>{
        for (let index = 0; index < 101; index++) {
            console.log(number);
            
            setTimeout(()=> {
                    setNumber(index);
            }, 10);
        }
        setComplete(true);
        //addInvisibleClass();
    }
    ,[]);

    function addInvisibleClass(){
        setTimeout(()=>{
            let invisibleClass = document.getElementById('countdown');
            invisibleClass?.classList.add('invisible');
        },1000);
    }
    return (
            <AnimatePresence>
                <motion.div id="countdown"
                    key={number}
                    exit={{opacity: 0, position: "absolute" }}
                    initial={{opacity: 1, visibility: "visible"}}
                    animate={{ 
                        y: 0,
                        transitionEnd: {
                            opacity: "0",
                            visibility: "hidden",
                            transitionDelay: "1s",
                            transitionDuration: ".3s",
                            },
                    }}
                    transition={{
                        ease: "easeOut",
                        duration: 0.01,
                    }}
                >
                    {number}%
                </motion.div>
            </AnimatePresence>
    )
}