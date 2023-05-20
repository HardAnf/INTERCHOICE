import { all, fork, Effect } from 'redux-saga/effects'

import userSaga from './user/user.saga'
import projectSaga from './movie/project/project.saga'
import userProjectsSaga from './user-projects/user-projects.saga'
import projectsSaga from './projects/projects.saga'
import { versionInfo } from 'root/utils/version'

export default function* rootSaga(): Generator<Effect, void, void> {
  console.info(versionInfo())
  yield all([fork(userSaga), fork(projectSaga), fork(userProjectsSaga), fork(projectsSaga)])
}
