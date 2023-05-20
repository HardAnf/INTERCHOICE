import React from 'react'
import styles from '../../projects-feed/styles.styl'

export interface VideoAnalyticsProps {
  projectId: string
  name: string
  previewUrl: string
  views: number
  finishing: number
  shares: number
  buttons: {
    [name: string]: number
  }
}

export const VideoAnalytics: React.FC<VideoAnalyticsProps> = ({
  name,
  previewUrl,
  views,
  finishing,
  shares,
  buttons
}) => {
  console.log(name, previewUrl, views, finishing, shares, buttons)
  const staticstsStyle = {
    color: '#fff',
    fontWeight: '24',
    fontSize: '24px'
  }
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'space-between'
      }}
    >
      <div
        style={{
          width: '50%',
          margin: '1em'
        }}
      >
        <img
          src={previewUrl}
          style={{
            width: '100%'
          }}
        />
      </div>
      <div
        style={{
          width: '50%',
          margin: '1em',
          backgroundColor: '#191919',
          padding: '1em'
        }}
      >
        <h1 style={staticstsStyle}>{name}</h1>
        <h3 style={staticstsStyle}>Просмотры - {views}</h3>
        <h3 style={staticstsStyle}>Досматриваемость - {finishing * 100}%</h3>
        {Object.keys(buttons).map(key => (
          <h4 style={staticstsStyle} key={key}>
            Выбор &quot;{key}&quot; - {buttons[key]}
          </h4>
        ))}
        <h3 style={staticstsStyle}>Поделились - {shares}</h3>
      </div>
    </div>
  )
}
