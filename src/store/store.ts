import { configureStore } from "@reduxjs/toolkit";

import * as cards from "./features/cardsSlice";

export interface State {
  cards: cards.State;
}

export default configureStore<State>({
  reducer: {
    cards: cards.reducer,
  },
});
