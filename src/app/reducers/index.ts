import { NgModule } from '@angular/core'
import { StoreModule, combineReducers, ActionReducer } from '@ngrx/store'
// import { RouterStoreModule } from '@ngrx/router-store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { storeFreeze } from 'ngrx-store-freeze'
import { createSelector } from 'reselect'

import * as fromQuote from './quote.reducer'
import * as fromAuth from './auth.reducer'
import * as fromProjects from './project.reducer'
import * as fromTaskLists from './task-list.reducer'
import * as fromTasks from './task.reducer'
import * as fromUsers from './user.reducer'
import { compose } from '@ngrx/core'
import { evironment } from '../environments/environment'

export interface State {
  quote: fromQuote.State
  auth: fromAuth.State
  projects: fromProjects.State
  taskLists: fromTaskLists.State
  users: fromUsers.State
  tasks: fromTasks.State
}

const initialState: State = {
  quote: fromQuote.initialState,
  auth: fromAuth.initialState,
  projects: fromProjects.initialState,
  taskLists: fromTaskLists.initialState,
  users: fromUsers.initialState,
  tasks: fromTasks.initialState,
}

const reducers = {
  quote: fromQuote.reducer,
  auth: fromAuth.reducer,
  projects: fromProjects.reducer,
  taskLists: fromTaskLists.reducer,
  users: fromUsers.reducer,
  tasks: fromTasks.reducer,
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

export const getQuoteState = (state: State) => state.quote
export const getAuthState = (state: State) => state.auth
export const getProjectsState = (state: State) => state.projects
export const getTaskListState = (state: State) => state.taskLists
export const getTasksState = (state: State) => state.tasks
export const getUserState = (state: State) => state.users
export const getQuote = createSelector(getQuoteState, fromQuote.getQuote)
export const getProjects = createSelector(getProjectsState, fromProjects.getAll)
export const getTasks = createSelector(getTasksState, fromTasks.getTasks)
export const getTaskLists = createSelector(
  getTaskListState,
  fromTaskLists.getTaskLists
)

const getUserEntities = createSelector(getUserState, fromUsers.getEntities)
const getTasksWithOwner = createSelector(
  getTasks,
  getUserEntities,
  (tasks, entities) =>
    tasks.map((task) => ({
      ...task,
      owner: entities[task.ownerId],
      participants: task.participantIds.map((id) => entities[id]),
    }))
)

export const getTasksByList = createSelector(
  getTaskLists,
  getTasksWithOwner,
  (lists, tasks) => {
    return lists.map((list) => ({
      ...list,
      tasks: tasks.filter((task) => task.taskListId === list.id),
    }))
  }
)

export const getProjectUsers = (projectId: string) =>
  createSelector(getProjectsState, getUserEntities, (state, entities) => {
    return state.entities[projectId].members.map((id) => entities[id])
  })
@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    // RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrument(),
  ],
})
export class AppStoreModule {}
