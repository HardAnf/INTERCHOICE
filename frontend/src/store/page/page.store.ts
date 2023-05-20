import * as React from 'react'
import { Reducer } from 'redux'
import { ActionType, getType } from 'typesafe-actions'
import * as actions from './page.actions'

export interface PageInfo {
  title: React.ReactNode | null
  headerTitle?: React.ReactNode
}

export interface PageStore {
  info: PageInfo
}

const initialState: PageStore = {
  info: {
    title: null
  }
}

export const pageReducer: Reducer<PageStore, ActionType<typeof actions>> = (
  state = initialState,
  action
): PageStore => {
  switch (action.type) {
    case getType(actions.setPageInfo):
      if (action.payload.title) {
        document.title = String(action.payload.title)
      }
      return { ...initialState, info: action.payload }
    default:
      return state
  }
}
