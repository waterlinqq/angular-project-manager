import * as actions from '../actions/quote.action'
import { Quote } from '../domain'

export interface State {
  quote: Quote
}
export const initialState: State = {
  quote: {
    cn: 'quotecn',
    en: 'quoteen',
    pic: '/assets/img/quotes/0.jpg',
  },
}

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ActionTypes.LOAD:
      return { ...state, quote: action.payload }
    case actions.ActionTypes.LOAD_SUCCESS:
      return { ...state, quote: action.payload }
    default:
      return state
  }
}
export const getQuote = (state: State) => state.quote
