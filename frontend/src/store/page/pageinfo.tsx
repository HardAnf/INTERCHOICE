import * as React from 'react'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { setPageInfo } from './page.actions'
import { PageInfo } from './page.store'
import { PageInfoDispatchProps, PageInfoProps } from 'root/store/page/page.types'

interface ComponentState {
  pageInfo: PageInfo | null
}

const withPageInfo = <T extends PageInfoProps>(
  Component: React.ComponentType<T>
): React.ComponentType<Omit<T, keyof PageInfoDispatchProps>> => {
  const PageInfoComponent: React.FC<Omit<T, keyof PageInfoDispatchProps>> = (props: T) => {
    const [info, setInfo] = useState<ComponentState>({
      pageInfo: null
    })

    const dispatch = useDispatch()
    const pageInfo = info.pageInfo ?? props.pageInfo
    useEffect(() => {
      if (pageInfo) {
        dispatch(setPageInfo(pageInfo))
      }
    }, [pageInfo])

    return (
      <Component
        {...props}
        setPageInfo={pageInfo => {
          setInfo({ pageInfo })
        }}
      />
    )
  }

  return PageInfoComponent
}

export default withPageInfo
