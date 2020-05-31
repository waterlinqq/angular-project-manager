import * as actions from '../actions/auth.action'

export interface State {}
export const initialState: State = {}

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ActionTypes.LOGIN_SUCCESS:
    case actions.ActionTypes.REGISTER_SUCCESS:
      return { ...action.payload }
    case actions.ActionTypes.LOGIN_FAIL:
    case actions.ActionTypes.REGISTER_FAIL:
      return initialState
    default:
      return state
  }
}
