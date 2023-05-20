import { appRoutes, fullAppRoute } from './appRoutes'

export const apiRoutes = {
  login: (): string => `/Login`,
  register: (): string => `/Register`,
  currentUser: (): string => '/user',
  createProject: (): string => '/project',
  project: (projectId: string): string => `/project/${projectId}`,
  projectSummary: (projectId: string): string => `/project/${projectId}/summary`,
  projectScenes: (projectId: string): string => `/project/${projectId}/scenes`,
  scene: (sceneId: string): string => `/scene/${sceneId}`,
  sceneVideo: (sceneId): string => `${apiRoutes.scene(sceneId)}/video`,
  sceneCoordinates: (sceneId: string): string => `${apiRoutes.scene(sceneId)}/coordinates`,
  connection: (): string => `/nodes-connection`,
  userProjects: (): string => `/user/projects`,
  projects: (): string => `/projects`,
  logout: (): string => `/Logout`
}

export const movieIframe = (movieId: string): string =>
  `<iframe style="width: 100vw; height: 100vh;" src="${fullAppRoute(
    appRoutes.movie(movieId)
  )}" frameborder="0"></iframe>`
