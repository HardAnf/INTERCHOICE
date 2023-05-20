export interface ProjectDraft {
  Name: string
  ShortDescription: string
  FullDescription: string
  Overview: File
}

export interface ProjectSceneData {
  id: string
  name?: string
  description?: string
  buttonName?: string
  isBeginning?: boolean
}

export interface ProjectScene extends ProjectSceneData {
  id: string
  x?: number
  y?: number
  question?: string
  parentGuids?: string[]
  childGuids?: string[]
  videoUrl?: string
}

export interface ProjectOverview {
  projectId: string
  userId: string
  name: string
  previewUrl?: string
  shortDescription?: string
  fullDescription?: string
}

export interface ProjectFull extends ProjectOverview {
  firstNode?: ProjectScene
  nodes: ProjectScene[]
}
