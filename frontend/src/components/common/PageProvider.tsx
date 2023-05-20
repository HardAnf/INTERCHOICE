import * as React from 'react'
import { useEffect, useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { pagesInfo } from 'root/pages'
import { setPageInfo } from 'root/store/page/page.actions'
import ym from 'react-yandex-metrika'

const PageProvider: React.FC = props => {
  const location = useLocation().pathname
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    const pageInfo = location in pagesInfo ? pagesInfo[location] : undefined

    if (pageInfo) {
      if (document.referrer) {
        const params = { referer: document.referrer }
        ym('hit', location, params)
      } else {
        ym('hit', location)
      }
      dispatch(setPageInfo(pageInfo))
    }
  }, [location])

  return <>{props.children}</>
}

export default PageProvider
