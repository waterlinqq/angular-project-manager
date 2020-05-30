export const QUOTE = 'QUOTE'
export const QUOTE_SUCCESS = 'QUOTE_SUCCESS'
export const QUOTE_FAIL = 'QUOTE_FAIL'

import { Action } from '@ngrx/store'
import { type } from './type.util'

import { Quote } from '../domain/quote.model'

export const ActionTypes = {
  LOAD: type('[Quote] Load'),
  LOAD_SUCCESS: type('[Quote] Load Success'),
  LOAD_FAIL: type('[Quote] Load Fail'),
}

export class LoadAction implements Action {
  readonly type = ActionTypes.LOAD
  constructor(public payload: Quote) {}
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS
  constructor(public payload: Quote) {}
}

export class LoadFailAction implements Action {
  readonly type = ActionTypes.LOAD_FAIL
  constructor(public payload: string) {}
}

export type Actions = LoadAction | LoadSuccessAction | LoadFailAction
