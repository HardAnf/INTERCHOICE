import { SagaIterator } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { userProjectsActions } from './user-projects.slice'
import { jsonFetch } from 'root/utils/api-fetch'
import { apiRoutes } from 'root/constants'
import { ProjectOverview } from 'root/shared/projects'

function* fetchUserProjects(): SagaIterator {
  try {
    const projects = (yield call(jsonFetch, apiRoutes.userProjects())) as ProjectOverview[]

    yield put(userProjectsActions.fetchSuccess(projects))
  } catch (e) {
    yield put(userProjectsActions.fetchFailure(e.message ?? null))
    console.error(e)
  }
}

function* deleteProject(action: PayloadAction<string>): SagaIterator {
  try {
    yield call(jsonFetch, apiRoutes.project(action.payload), {
      method: 'DELETE'
    })
    yield put(userProjectsActions.deleteFinish(action.payload))
  } catch (e) {
    yield put(userProjectsActions.deleteFailure())
    console.error(e)
  }
}

export default function* userProjectsSaga(): SagaIterator {
  yield takeLatest(userProjectsActions.fetch, fetchUserProjects)

  yield takeLatest(userProjectsActions.delete, deleteProject)
}
