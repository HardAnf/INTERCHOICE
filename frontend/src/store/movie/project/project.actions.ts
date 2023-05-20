import { createAsyncAction } from 'typesafe-actions'
import { ProjectDraft, ProjectFull, ProjectScene, ProjectSceneData } from 'root/shared/projects'

export const createProject = createAsyncAction(
  'CREATE_PROJECT/REQUEST',
  'CREATE_PROJECT/SUCCESS',
  'CREATE_PROJECT/FAILURE'
)<ProjectDraft, string, void>()

export const getProject = createAsyncAction(
  'GET_PROJECT/REQUEST',
  'GET_PROJECT/SUCCESS',
  'GET_PROJECT/FAILURE'
)<string, ProjectFull, void>()

export const addScene = createAsyncAction(
  'ADD_SCENE/REQUEST',
  'ADD_SCENE/SUCCESS',
  'ADD_SCENE/FAILURE'
)<string, string, void>()

export interface UpdateSceneCoordinatesPayload {
  id: string
  x: number
  y: number
}

export const updateSceneCoordinates = createAsyncAction(
  'UPDATE_SCENE_COORDINATES/REQUEST',
  'UPDATE_SCENE_COORDINATES/SUCCESS',
  'UPDATE_SCENE_COORDINATES/FAILURE'
)<UpdateSceneCoordinatesPayload, UpdateSceneCoordinatesPayload, void>()

export const deleteScene = createAsyncAction(
  'DELETE_SCENE/REQUEST',
  'DELETE_SCENE/SUCCESS',
  'DELETE_SCENE/FAILURE'
)<string, string, void>()

export const updateScene = createAsyncAction(
  'UPDATE_SCENE/REQUEST',
  'UPDATE_SCENE/SUCCESS',
  'UPDATE_SCENE/FAILURE'
)<ProjectSceneData, ProjectSceneData, void>()

export const setEditedScene = createAsyncAction(
  'SET_EDITED_SCENE/REQUEST',
  'SET_EDITED_SCENE/SUCCESS',
  'SET_EDITED_SCENE/FAILURE'
)<ProjectScene | null, void, void>()

export interface ConnectionPayload {
  fromId: string
  toId: string
}

export const addConnection = createAsyncAction(
  'ADD_CONNECTION/REQUEST',
  'ADD_CONNECTION/SUCCESS',
  'ADD_CONNECTION/FAILURE'
)<ConnectionPayload, ConnectionPayload, void>()

export const deleteConnection = createAsyncAction(
  'DELETE_CONNECTION/REQUEST',
  'DELETE_CONNECTION/SUCCESS',
  'DELETE_CONNECTION/FAILURE'
)<ConnectionPayload, ConnectionPayload, void>()

export interface UploadSceneVideoPayload {
  video: File
  sceneId: string
}

export interface UploadSceneVideoSuccessPayload {
  sceneId: string
  videoUrl: string
}

export const uploadSceneVideo = createAsyncAction(
  'UPLOAD_SCENE_VIDEO/REQUEST',
  'UPLOAD_SCENE_VIDEO/SUCCESS',
  'UPLOAD_SCENE_VIDEO/FAILURE'
)<UploadSceneVideoPayload, UploadSceneVideoSuccessPayload, void>()
