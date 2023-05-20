import { PageInfo } from './page.store'

export interface PageInfoOwnProps {
  pageInfo?: PageInfo
}

export interface PageInfoDispatchProps {
  setPageInfo(info: PageInfo): void
}

export type PageInfoProps = PageInfoOwnProps & PageInfoDispatchProps
