import React, { useState } from 'react'
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { useDispatch } from 'react-redux'
import TrendingUp from '@material-ui/icons/TrendingUp'
import TrendingDown from '@material-ui/icons/TrendingDown'

import { VideoAnalytics, VideoAnalyticsProps } from './VideoAnalytics'
import { useAppSelector } from 'root/store/application.store'
import { userProjectsActions } from 'root/store/user-projects/user-projects.slice'
import { Loader } from 'components/Loader'

// сделать это нормально, разбить компоненты, разбить на файлы

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

type Conversion = {
  previous_dates: string
  previous: number
  dates: string
  current: number
}

type Category = {
  name: string
  value: number
}

interface Analytics {
  graph: DayInfo[]
  videos: Videos
  conversion: Conversion
  interests: Category[]
  demographics: Category[]
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
  const colors = ['#9729B8', '#F27E85', '#C4C4C4', '#E047C8', '#D447E0']

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

  const conversionGrowth = data.conversion.current - data.conversion.previous
  const conversionStyle = {
    fontSize: '2rem',
    fontWeight: 'bold'
  }

  return (
    <div
      className='container'
      style={{
        height: '90vh'
      }}
    >
      <div
        style={{
          width: '100%',
          backgroundColor: '#4c4c4c',
          color: '#fff',
          margin: '0.5em',
          padding: '0.5em',
          display: 'flex',
          flexFlow: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <p style={conversionStyle}>Конверсия за текущий период</p>
          <p style={conversionStyle}>
            <span style={{ color: '#e32879' }}>{data.conversion.dates}</span> -{' '}
            {data.conversion.current}%
          </p>
          <p style={conversionStyle}>Конверсия за прошедший период </p>
          <p style={conversionStyle}>
            <span style={{ color: '#e32879' }}>{data.conversion.previous_dates}</span> -{' '}
            {data.conversion.previous}%
          </p>
        </div>
        <p
          style={{
            color: conversionGrowth < 0 ? '#d32f2f' : '#388e3c',
            fontSize: '2rem',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {conversionGrowth < 0 ? (
            <TrendingDown
              style={{
                fontSize: '48px'
              }}
            />
          ) : (
            <TrendingUp
              style={{
                fontSize: '48px'
              }}
            />
          )}{' '}
          Рост {conversionGrowth}%
        </p>
      </div>
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
      <div
        style={{
          display: 'flex',
          flexFlow: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <p style={{ color: '#fff', textAlign: 'center', width: '50%', ...conversionStyle }}>
          Демография
        </p>
        <p style={{ color: '#fff', textAlign: 'center', width: '50%', ...conversionStyle }}>
          Интересы
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          flexFlow: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '40vh'
        }}
      >
        <ResponsiveContainer width='50%' height='100%'>
          <PieChart width={500} height={500}>
            <Pie
              dataKey='value'
              isAnimationActive={false}
              data={data.demographics}
              cx='50%'
              cy='50%'
              outerRadius={80}
              fill='#e32879'
              paddingAngle={2}
              label
            >
              {data.demographics.map((_, i) => (
                <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <ResponsiveContainer width='50%' height='100%'>
          <PieChart width={500} height={500}>
            <Pie
              dataKey='value'
              isAnimationActive={false}
              data={data.interests.filter(v => v.value > 2)}
              cx='50%'
              cy='50%'
              outerRadius={80}
              fill='#e32879'
              paddingAngle={2}
              label
            >
              {data.interests
                .filter(v => v.value > 2)
                .map((_, i) => (
                  <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <hr />
      {analyticsData.map(videoAnalytics => (
        <VideoAnalytics {...videoAnalytics} key={videoAnalytics.projectId} />
      ))}
    </div>
  )
}
