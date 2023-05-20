import React, { useState } from 'react'
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { useDispatch } from 'react-redux'

import { VideoAnalytics, VideoAnalyticsProps } from './VideoAnalytics'
import { useAppSelector } from 'root/store/application.store'
import { userProjectsActions } from 'root/store/user-projects/user-projects.slice'
import { Loader } from 'components/Loader'

type DayInfo = {
  date: string
  views: number
  visitors: number
}

type ButtonsAnalytics = {
  [key: string]: number
}

type MovieResponse = {
  views: number
  shares: number
  finishing: number
  buttons: ButtonsAnalytics
}

type Videos = {
  [guid: string]: MovieResponse
}

interface Analytics {
  graph: DayInfo[]
  videos: Videos
}

const getAnalytics = async (userId: string): Promise<Analytics> => {
  const response = await (
    await fetch(`https://analytic.inter-choice.ru/analytics/${userId}`, {
      method: 'get'
    })
  ).json()
  return response as Analytics
} // TODO: replace with saga

export const AnalyticsPage: React.FC = () => {
  const projects = useAppSelector(state => state.userProjects.value)
  const pending = useAppSelector(state => state.userProjects.pending)
  const [data, setData] = useState<Analytics | null>(null)
  const userId = ''

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(userProjectsActions.fetch())
  }, [])

  React.useEffect(() => {
    if ((!pending && projects.length > 0) || userId) {
      void (async () => {
        setData(await getAnalytics(projects.length > 0 ? projects[0].userId : userId))
      })()
    }
  }, [pending])

  if (projects.length === 0 && !userId) {
    return (
      <div className='container'>
        <h1
          style={{
            color: '#fff',
            textAlign: 'center'
          }}
        >
          На аккаунте нет видео
        </h1>
      </div>
    )
  }

  if (pending || data === null) {
    return <Loader />
  }

  console.log(data)

  const analytics = Object.keys(data.videos).map(key => ({
    projectId: key,
    ...data.videos[key]
  }))
  console.log(analytics)

  const analyticsData: VideoAnalyticsProps[] = projects
    .filter(movie => analytics.find(el => el.projectId === movie.projectId) !== undefined)
    .map(movie => {
      const movieAnalytics = analytics.find(el => el.projectId === movie.projectId)!
      return {
        name: movie.name,
        previewUrl: movie.previewUrl ?? '',
        ...movieAnalytics
      }
    })
  console.log(analyticsData)

  return (
    <div
      className='container'
      style={{
        height: '90vh'
      }}
    >
      <ResponsiveContainer width='100%' height='80%'>
        <ComposedChart width={500} height={400} data={data.graph}>
          <XAxis dataKey='date' scale='auto' />
          <YAxis />
          <Legend />
          <Bar name='Просмотры' dataKey='views' fill='#e32879' />
          <Line name='Посетители' dataKey='visitors' stroke='#fff' />
          <Tooltip
            contentStyle={{
              backgroundColor: '#191919'
            }}
            labelStyle={{
              color: '#666'
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <hr />
      {analyticsData.map(videoAnalytics => (
        <VideoAnalytics {...videoAnalytics} key={videoAnalytics.projectId} />
      ))}
    </div>
  )
}
