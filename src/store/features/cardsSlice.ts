/* eslint-disable array-callback-return */
import { createSlice, SliceCaseReducers,  PayloadAction } from "@reduxjs/toolkit";
import Card from "../../models/card";


export interface State {
  list: Card[];
  steps: number
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function createArray (size: number): Card[] {
  const arr = [];
  for(let i = 0; i < size/2; i++){
  const color = getRandomColor()
    arr.push({id: i, content: i, isVisible: false, isMatched: false, color: color})
    arr.push({id: i, content: i, isVisible: false, isMatched: false, color: color})
  }
  return arr.sort(() => Math.random() - 0.5);
 
}

const slice = createSlice<State, SliceCaseReducers<State>>({
  name: "cards",
  initialState: {
    list: [],
    steps: 0
  },
  reducers: {
    createList: (state: State, action: PayloadAction<number>) => {
      state.list = createArray(action.payload)
    },
    visible: (state, action) => {
      //See the card
      const card = state.list[action.payload];
      if (card.isVisible) {
        return;
      }
      
      card.isVisible = true
      state.steps += 1

      const visibleCards = state.list.filter((c) => c.isVisible);
      
      visibleCards.forEach(c => {
        if (c !== card && c.id === card.id) {
          c.isMatched = true;
          card.isMatched = true
        }
      })
      
      if(visibleCards.length > 2) {
        visibleCards.forEach(c => {
          if (c !== card) {
            c.isVisible = false
          }
        })        
      }
    }
}})

export const selectList = (state: State) => state.list;

export const selectSteps = (state: State) => state.steps;

export const selectWinGame = (state: State) => state.list.every(el => el.isMatched);

export const { createList, visible } = slice.actions;

export const reducer = slice.reducer;
