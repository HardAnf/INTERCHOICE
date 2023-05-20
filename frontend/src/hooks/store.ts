import { useAppSelector } from 'root/store/application.store'

export const useAuth = (): boolean | undefined =>
  useAppSelector(store => (store.user.value === undefined ? undefined : store.user.value !== null))
