import { TaskList, Project } from '../domain'
import { createSelector } from 'reselect'
import { covertArrToObj, buildObjFromArr } from '../utils/reducer.util'
import * as _ from 'lodash'
import * as actions from '../actions/task-list.action'
import * as prjActions from '../actions/project.action'

export interface State {
  ids: string[]
  entities: { [id: string]: TaskList }
  selectedIds: string[]
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedIds: [],
}

const addList = (state, action) => {
  const taskList = action.payload as TaskList
  if (state.ids.indexOf(taskList.id) > -1) {
    return state
  }
  const newIds = [...state.ids, taskList.id]
  const newEntities = { ...state.entities, [taskList.id]: taskList }
  return {
    ids: newIds,
    entities: newEntities,
    selectedIds: [...state.selectedIds, taskList.id],
  }
}

const delList = (state, action) => {
  const taskList = action.payload as TaskList
  const newIds = state.ids.filter((id) => id !== taskList.id)
  const newEntities = buildObjFromArr(newIds, state.entities)
  const newSelectedIds = state.selectedIds.filter((id) => id !== taskList.id)
  return {
    ids: newIds,
    entities: newEntities,
    selectedIds: newSelectedIds,
  }
}

const delListByPrj = (state, action) => {
  const project = action.payload as Project
  const taskListIds = project.taskLists
  const remaningIds = _.difference(state.ids, taskListIds)
  const remainingEntities = buildObjFromArr(remaningIds, state.entities)
  const selectedIds = _.difference(state.selectedIds, taskListIds)
  return {
    ids: [...remaningIds],
    entities: remainingEntities,
    selectedIds: [...selectedIds],
  }
}

const updateList = (state, action) => {
  const taskList = action.payload as TaskList
  const entities = { ...state.entities, [taskList.id]: taskList }
  return { ...state, entities }
}

const swapOrder = (state, action) => {
  const taskLists = action.payload as TaskList[]
  if (taskLists === null) {
    return state
  }
  const updated = covertArrToObj(taskLists)
  const updatedEntities = { ...state.entities, ...updated }
  return { ...state, entities: updatedEntities }
}

const loadLists = (state, action) => {
  const taskLists = action.payload as TaskList[]
  // if taskList is null then return the orginal state
  if (taskLists === null) {
    return state
  }
  const newTaskLists = taskLists.filter(
    (taskList) => !state.entities[taskList.id]
  )
  if (newTaskLists.length === 0) {
    return state
  }
  const newIds = newTaskLists.map((taskList) => taskList.id)
  const newEntities = covertArrToObj(newTaskLists)
  return {
    ids: [...state.ids, ...newIds],
    entities: { ...state.entities, ...newEntities },
    selectedIds: [...newIds],
  }
}

const selectPrj = (state, action) => {
  const selectedIds = state.ids.filter(
    (id) => state.entities[id].projectId === (action.payload as Project).id
  )
  return { ...state, selectedIds }
}

export function reducer(
  state = initialState,
  action: actions.Actions & prjActions.Actions
): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS:
      return addList(state, action)
    case actions.ActionTypes.DELETE_SUCCESS:
      return delList(state, action)
    case prjActions.ActionTypes.DELETE_SUCCESS:
      return delListByPrj(state, action)
    case actions.ActionTypes.UPDATE_SUCCESS:
      return updateList(state, action)
    case actions.ActionTypes.SWAP_ORDER_SUCCESS:
      return swapOrder(state, action)
    case actions.ActionTypes.LOADS_SUCCESS:
      return loadLists(state, action)
    case prjActions.ActionTypes.SELECT:
      return selectPrj(state, action)
    default:
      return state
  }
}

export const getEntities = (state) => state.entities
export const getIds = (state) => state.ids
export const getTaskLists = createSelector(
  getEntities,
  getIds,
  (entities, ids) => {
    return ids.map((id) => entities[id])
  }
)
export const getSelectedIds = (state) => state.selectedIds
