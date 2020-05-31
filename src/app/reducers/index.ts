import { NgModule } from '@angular/core'
import { StoreModule, combineReducers, ActionReducer } from '@ngrx/store'
// import { RouterStoreModule } from '@ngrx/router-store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { storeFreeze } from 'ngrx-store-freeze'
import { createSelector } from 'reselect'

import * as fromQuote from './quote.reducer'
import * as fromAuth from './auth.reducer'
import { compose } from '@ngrx/core'
import { evironment } from '../environments/environment'

export interface State {
  quote: fromQuote.State
  auth: fromAuth.State
}

const initialState: State = {
  quote: fromQuote.initialState,
  auth: fromAuth.initialState,
}

const reducers = {
  quote: fromQuote.reducer,
  auth: fromAuth.reducer,
}
// const productionReducers: ActionReducer<State> = combineReducers(reducers)
// const developmentReducers: ActionReducer<State> = compose(
//   storeFreeze,
//   combineReducers
// )(reducers)

// export function reducer(state = initialState, action: any): State {
//   return evironment.production
//     ? productionReducers(state, action)
//     : developmentReducers(state, action)
// }

const getQuoteState = (state: State) => state.quote
export const getAuthState = (state: State) => state.auth
export const getQuote = createSelector(getQuoteState, fromQuote.getQuote)

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    // RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrument(),
  ],
})
export class AppStoreModule {}
