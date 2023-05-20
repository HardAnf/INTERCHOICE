import { SagaIterator } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import { projectsActions } from './projects.slice'
import { jsonFetch } from 'root/utils/api-fetch'
import { apiRoutes } from 'root/constants'
import { ProjectOverview } from 'root/shared/projects'

function* fetchProjects(): SagaIterator {
  try {
    const projects = (yield call(jsonFetch, apiRoutes.projects())) as ProjectOverview[]

    yield put(projectsActions.fetchSuccess(projects))
  } catch (e) {
    yield put(projectsActions.fetchFailure(e.message ?? null))
    console.error(e)
  }
}

export default function* projectsSaga(): SagaIterator {
  yield takeLatest(projectsActions.fetch, fetchProjects)
}
