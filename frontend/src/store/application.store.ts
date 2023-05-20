import { useSelector, useStore } from 'react-redux'
import { AnyAction, applyMiddleware, combineReducers, createStore, Store } from 'redux'
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'
import rootSaga from './application.saga'
import { projectReducer, ProjectStore } from './movie/project/project.store'
import { pageReducer, PageStore } from './page/page.store'
import { projectsReducer, ProjectsStore } from './projects/projects.slice'
import { userProjectsReducer } from './user-projects/user-projects.slice'
import { userReducer, UserStore } from './user/user.store'

export interface ApplicationStore {
  user: UserStore
  page: PageStore
  project: ProjectStore
  projects: ProjectsStore
  userProjects: ProjectsStore
}

export function createApplicationStore(): Store<ApplicationStore> {
  const sagaMiddleware: SagaMiddleware = createSagaMiddleware()
  const store: Store<ApplicationStore> = createStore(
    combineReducers<ApplicationStore>({
      user: userReducer,
      page: pageReducer,
      project: projectReducer,
      projects: projectsReducer,
      userProjects: userProjectsReducer
    }),
    applyMiddleware(sagaMiddleware)
  )
  sagaMiddleware.run(rootSaga)
  return store
}

export const useAppStore = (): Store<ApplicationStore, AnyAction> => {
  return useStore<ApplicationStore>()
}

export const useAppSelector = <Selected = unknown>(
  selector: (state: ApplicationStore) => Selected
): Selected => {
  return useSelector<ApplicationStore, Selected>(selector)
}
