import { createAction } from 'typesafe-actions'
import { PageInfo } from './page.store'

export const setPageInfo = createAction('PAGE_INFO/SET')<PageInfo>()
