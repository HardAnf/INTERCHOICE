import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProjectOverview } from 'root/shared/projects'

export interface ProjectsStore {
  value: ProjectOverview[]
  pending: boolean
  error: string | null
}

const initialState: ProjectsStore = {
  value: [],
  pending: false,
  error: null
}

const projectsSlice = createSlice({
  name: 'projectsSelector',
  initialState,
  reducers: {
    fetch(state: ProjectsStore) {
      state.pending = true
    },
    fetchSuccess(state: ProjectsStore, action: PayloadAction<ProjectOverview[]>) {
      state.pending = false
      state.value = action.payload
    },
    fetchFailure(state: ProjectsStore, action: PayloadAction<string | null>) {
      state.pending = false
      state.error = action.payload
    }
  }
})

export const { reducer: projectsReducer, actions: projectsActions } = projectsSlice
