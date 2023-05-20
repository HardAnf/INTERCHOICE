import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { ProjectsStore } from '../projects/projects.slice'
import { ProjectOverview } from 'root/shared/projects'

const initialState: ProjectsStore = {
  value: [],
  pending: false,
  error: null
}

const projectsSlice = createSlice({
  name: 'userProjectsSelector',
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
    },
    delete(state: ProjectsStore, _action: PayloadAction<string>) {
      state.pending = true
    },
    deleteFinish(state: ProjectsStore, action: PayloadAction<string>) {
      toast('Проект удалён', { type: 'success' })
      state.pending = false
      state.value = state.value.filter(project => project.projectId !== action.payload)
    },
    deleteFailure(state: ProjectsStore) {
      state.pending = false
      toast('Ошибка при удалении проекта', { type: 'error' })
    }
  }
})

export const { reducer: userProjectsReducer, actions: userProjectsActions } = projectsSlice
