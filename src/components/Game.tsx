/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable array-callback-return */
import React, {useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from "react-redux";

import './Game.css'

import { createList, visible } from "../store/features/cardsSlice";
import { selectCards, selectWinGame, selectSteps } from "../store/selectors";
import Card from '../models/card';
import { useSprings, animated } from 'react-spring';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = () => {
  const list = useSelector(selectCards)
  const steps = useSelector(selectSteps)
  const win = useSelector(selectWinGame)

  const springs= useSprings(list.length, list.map((card) => ({
    visibility: card.isMatched? "hidden" : "unset",
    transform: `perspective(700px) rotateY(${card.isVisible ? 0 : 180}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })))

  const dispatch = useDispatch()
 
 
  useEffect(() => {
    dispatch<any>(createList(16))
  }, [dispatch]);
 
  const visibleHandler = useCallback((card) => {
    dispatch<any>(visible(card))
   
    },[dispatch],
  )

  return (
    <div className="container">
      {(win || steps > 30) ?
      <h1>{win? "YOU WON THE GAME!!!!" : "YOU RAN OUT OF CLICKS"}</h1>
      :
      <ul style={{color: "white"}}>
      {list && list.length && list.map((card: Card, i) => (
           <li key={i} style={springs[i]} onClick={() => visibleHandler(i)}>
             <animated.div style={springs[i]}/>
             <animated.div style={{...springs[i], background: card.isVisible? card.color : "#242421", opacity: card.isVisible ? 1 : 0,}}>
             {card.isVisible && card.content}
            </animated.div>
            
           </li>
      ))}
      </ul>}
    </div>
  );
};

export default ExploreContainer;
