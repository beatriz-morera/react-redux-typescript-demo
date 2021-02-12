
import { createSelector } from '@reduxjs/toolkit'
import * as cards from "./features/cardsSlice";

import { State } from "./store";

export const selectCards = createSelector((state: State) => state.cards, cards.selectList);
export const selectSteps = createSelector((state: State) => state.cards, cards.selectSteps);
export const selectWinGame = createSelector((state: State) => state.cards, cards.selectWinGame);